module.exports = function (app, port,environment,server,console,models) {
    

    return{
        isVoid:function(obj){
            switch(typeof(obj)){
              case "undefined":
              case "object":
                for(var x in obj){
                  if(obj.hasOwnProperty(x))
                    return false;
                  else
                    return true;
                }
                return true;
              case "number":
              case "boolean":
                return false;
                break;
              case "string":
                if(obj == "")
                  return true;
                else
                  return false;
              default:
                return false;
            }
          },
          getClientIp : function(req,res,next) {
          console.info("@getClientIp...")
           var ipAddress;
           // The request may be forwarded from local web server.
           var forwardedIpsStr = req.header('x-forwarded-for');
           if (forwardedIpsStr) {
             // 'x-forwarded-for' header may return multiple IP addresses in
             // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
             // the first one
             var forwardedIps = forwardedIpsStr.split(',');
             ipAddress = forwardedIps[0];
           }
           if (!ipAddress) {
             // If request was not forwarded
             ipAddress = req.connection.remoteAddress;
           }
           console.info("client ip is -- ",ipAddress)
           next()
         }
    }
}