module.exports = function (serverInfo,console) {
    

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
    }
}