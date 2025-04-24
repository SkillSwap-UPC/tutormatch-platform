import { Column } from 'typeorm';
import { RoleType } from './RoleType';

export class Role {
  @Column('enum', { 
    enum: RoleType,
    name: 'role_type'
  })
  private _roleType: RoleType;

  constructor(roleType?: RoleType) {
    // Assuming there's a default role type in the enum, like RoleType.USER
    this._roleType = roleType || RoleType.STUDENT;
  }

  get roleType(): RoleType {
    return this._roleType;
  }

  set roleType(value: RoleType) {
    this._roleType = value;
  }
}