"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const relpg_1 = __importDefault(require("./relpg/relpg"));
//  const RELPG = new relpg("localhost",5432,"megasoft","daze","159654")
const RELPG = new relpg_1.default("dazedate.com", 5432, "megasoft", "daze", "159654");
RELPG.SELECT();
// console.log(DB)
