module.exports.normalize = function(s) {
  return s.replace(/[ěé]/gi,'e').replace(/š/gi,'s').replace(/č/gi,'c').replace(/ř/gi,'r').replace(/ž/gi,'z').replace(/ý/gi,'y').replace(/á/gi,'a').replace(/í/gi,'i');
};
