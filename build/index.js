"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const relpg_1 = __importDefault(require("./relpg/relpg"));
//  const RELPG = new relpg("localhost",5432,"megasoft","daze","159654")
const RELPG = new relpg_1.default("dazedate.com", 5432, "megasoft", "postgres", "159654");
function name() {
    return __awaiter(this, void 0, void 0, function* () {
        //  console.log()
        // await RELPG.LIST("users")
        // await RELPG.ADD("users","user_name,user_surname",["Berk","Coşar"])
        // await RELPG.UPDATE("users","user_name","uid,user_surname",["can","B","362bd0a4-0814-4d4c-ace3-cf8ab82403c4","Coşar"])
        // await RELPG.UPDATE("users","user_name","uid",["Can Berk","362bd0a4-0814-4d4c-ace3-cf8ab82403c4"])
        // await RELPG.DEL("users")
        // await RELPG.DEL("users","user_name,user_surname",["Berk","Coşar"])
        let d = yield RELPG.DELETEDB("ddb");
    });
}
name();
