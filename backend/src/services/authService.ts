import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import MailerService from './mailerService';
import config from '../config';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { IUser, IUserSignUpDTO } from '../interfaces/IUser';
import UserDTO from '../dtos/UserDTO';
import IUserRepository from '../interfaces/IUserRepository';

@Service()
export default class AuthService {
  constructor(
    private mailer: MailerService,
    @Inject('logger') private logger,
    @Inject('userRepository') private userRepository: IUserRepository,
  ) {}

  public async SignUp(userSignupDTO: IUserSignUpDTO): Promise<{ user: IUser; token: string }> {
    try {
      const existingUser = await this.userRepository.findByEmail(userSignupDTO.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const salt = randomBytes(32);
      this.logger.silly('Hashing password');
      const hashedPassword = await argon2.hash(userSignupDTO.password, { salt });
      this.logger.silly('Creating user db record');

      const userRecordData: IUser = {
        email: userSignupDTO.email.toLowerCase(),
        salt: salt.toString('hex'),
        password: hashedPassword,
      };

      const userRecord = await this.userRepository.save(userRecordData);

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      //this.logger.silly('Sending welcome email');
      //await this.mailer.SendWelcomeEmail(userRecord.email);

      const user = UserDTO.fromEntity(userRecord);
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async SignIn(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userRepository.findByEmail(email);
    if (!userRecord) {
      throw new Error('User not registered');
    }

    // We use verify from argon2 to prevent 'timing based' attacks
    this.logger.silly('Checking password');
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      const user = UserDTO.fromEntity(userRecord);
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user.id}`);
    return jwt.sign(
      {
        id: user.id, // We are gonna use this in the middleware 'isAuth'
        //role: user.role,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
