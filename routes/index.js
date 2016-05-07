
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Tettus' });
};

/*
 * initial status before verification
 */
module.exports.STATUS_IN_VERIFICATION="0";
/*
 * User in active status after verification
 */
module.exports.STATUS_VERIFIED_AND_ACTIVE="1";
/*
 * User deactivated
 */
module.exports.STATUS_DEACTIVATED="2";