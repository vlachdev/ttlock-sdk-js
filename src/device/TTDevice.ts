'use strict';

import { EventEmitter } from "events";
import { LockType } from "../constant/Lock";

export class TTDevice extends EventEmitter {
  // public data
  id: string = "";
  uuid: string = "";
  name: string = "";
  manufacturer: string = "unknown";
  model: string = "unknown";
  hardware: string = "unknown";
  firmware: string = "unknown";
  address: string = "";
  rssi: number = 0;
  /** @type {byte} */
  protocolType: number = 0;
  /** @type {byte} */
  protocolVersion: number = 0;
  /** @type {byte} */
  scene: number = 0;
  /** @type {byte} */
  groupId: number = 0;
  /** @type {byte} */
  orgId: number = 0;
  /** @type {byte} */
  lockType: LockType = LockType.UNKNOWN;
  isTouch: boolean = false;
  isUnlock: boolean = false;
  hasEvents: boolean = true;
  isSettingMode: boolean = false;
  /** @type {byte} */
  txPowerLevel: number = 0;
  /** @type {byte} */
  batteryCapacity: number = -1;
  /** @type {number} */
  date: number = 0;
  isWristband: boolean = false;
  isRoomLock: boolean = false;
  isSafeLock: boolean = false;
  isBicycleLock: boolean = false;
  isLockcar: boolean = false;
  isGlassLock: boolean = false;
  isPadLock: boolean = false;
  isCyLinder: boolean = false;
  isRemoteControlDevice: boolean = false;
  isDfuMode: boolean = false;
  isNoLockService: boolean = false;
  remoteUnlockSwitch: number = 0;
  disconnectStatus: number = 0;
  parkStatus: number = 0;

  toJSON(asObject: boolean = false): string | Object {
    const temp = new TTDevice();
    const json: Record<string, any> = {};

    // Exclude keys that we don't need from the export
    const excludedKeys = new Set([
      "_eventsCount"
    ]);

    Object.getOwnPropertyNames(temp).forEach((key) => {
      if (!excludedKeys.has(key)) {
        const val = Reflect.get(this, key);

        if (typeof val !== "undefined") {
          if (typeof val === "string" && val.length > 0) {
            Reflect.set(json, key, val);
          } else if (val instanceof Buffer) {
            Reflect.set(json, key, val.toString("hex"));
          } else if (Array.isArray(val) && val.length > 0) {
            Reflect.set(json, key, val);
          } else if (typeof val === "object" && val !== null) {
            Reflect.set(json, key, JSON.stringify(val));
          } else if (typeof val !== "object") {
            Reflect.set(json, key, val);
          }
        }
      }
    });

    return asObject ? json : JSON.stringify(json);
  }
}
