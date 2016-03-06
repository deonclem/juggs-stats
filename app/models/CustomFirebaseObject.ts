import {Player} from "./Player";
import {Play} from "./Play";
export interface CustomFirebaseObject extends AngularFireObject {

    plays: Play[];
    players: Player[];
}