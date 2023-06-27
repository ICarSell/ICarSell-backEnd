import {
  IAnnouncement,
  IReturnAllAnnouncement,
  IReturnAnnouncement,
  IUpdateAnnouncement,
} from "./announcement/annoucement.interface";
import { IDataLogin } from "./login/loginUser.interface";
import {
  tUserReq,
  tUserReturn,
  tUserReturnWithoutPass,
  tUserReturnWithoutPassAndAddress,
  tUserUpdate,
} from "./users/users.interface";
import { tAddressReq } from "./users/address.interface";
import { tAddressUpdate } from "./users/address.interface";
import {
  tCommentReq,
  tCommentReturn,
  tCommentUpdate,
  tCommentReturnNew,
} from "./comments/comments.interface";

export {
  IAnnouncement,
  IReturnAnnouncement,
  IReturnAllAnnouncement,
  IUpdateAnnouncement,
  tUserReq,
  tUserReturn,
  tUserReturnWithoutPass,
  tUserUpdate,
  IDataLogin,
  tAddressReq,
  tAddressUpdate,
  tUserReturnWithoutPassAndAddress,
  tCommentReq,
  tCommentReturn,
  tCommentUpdate,
  tCommentReturnNew
};
