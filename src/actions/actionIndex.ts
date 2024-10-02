import levelUp from "./user/levelUp";
import giveStat from "./user/giveStat";
import createSkill from "./skill/createSkill";
import grantSkill from "./skill/grantSkill";
import deleteSkill from "./skill/deleteSkill";
import revokeSkill from "./skill/revokeSkill";
/**
 * Index of all the actions
 * @type {Object}
 * @name actions
 * @memberof module:Actions
 */
export default {
  user: {
    levelUp,
    giveStat,
  },
  skill: {
    create: createSkill,
    grant: grantSkill,
    delete: deleteSkill,
    revoke: revokeSkill,
  },
};
