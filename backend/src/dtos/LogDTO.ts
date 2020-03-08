import { IUser } from './../interfaces/IUser';
import LogEntity from '../entities/Log';
import ApplicationEvents from '../constants/events';

export default class LogDTO implements Readonly<LogDTO> {
  id?: number;
  createdAt?: Date;
  logText: ApplicationEvents;
  user?: IUser;

  public static from(dto: Partial<LogDTO>) {
    const log = new LogDTO();
    log.id = dto?.id;
    log.createdAt = dto?.createdAt;
    log.logText = dto?.logText;
    log.user = dto?.user;
    return log;
  }

  public static fromEntity(entity: LogEntity) {
    if (!entity) return null;
    return this.from({
      ...(entity?.id && { id: entity?.id }),
      ...(entity?.createdAt && { createdAt: entity?.createdAt }),
      ...(entity?.logText && { logText: entity?.logText }),
      ...(entity?.user && { user: entity?.user }),
    });
  }

  public toEntity() {
    const it = new LogEntity();
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.logText = this.logText;
    it.user = this.user;
    return it;
  }
}
