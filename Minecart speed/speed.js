/*
    @Author: Ithan lara 
    @github: https://github.com/ithan/Scriptcraft-Custom-Mods-
    @Version: Alpha 0.1
*/


// Variables

var defaultMaxSpeed = 0.4,
    customMaxSpeed = 2,
    checkDistance = 4,
    seedMultiplyer = 1.4;


events.vehicleMove(function(event){
  
    if(event.getVehicle().getName() == 'entity.MinecartRideable.name' && !event.getVehicle().isEmpty()){

            
            var nextLocation = event.getTo();
            var temporalLocationStorage = event.getTo();
        
            if(event.getVehicle().getVelocity().x > 0 || event.getVehicle().getVelocity().x < 0){
                temporalLocationStorage = server.getWorlds()[0].getBlockAt(temporalLocationStorage.getX() + (Math.floor(event.getVehicle().getVelocity().x) * checkDistance),temporalLocationStorage.y,Math.floor(temporalLocationStorage.z));
            } else {
                temporalLocationStorage = server.getWorlds()[0].getBlockAt(Math.floor(temporalLocationStorage.x),temporalLocationStorage.y,temporalLocationStorage.getZ() + (Math.floor(event.getVehicle().getVelocity().z) * checkDistance));
            }
        

            // Si el bloque almacenado es un rail 
            // list of rail types ['POWERED_RAIL',"RAILS","DETECTOR_RAILS"]
        
            var blockType = temporalLocationStorage.type;
            if( blockType == "RAILS" || blockType == "POWERED_RAIL"){
                event.getVehicle().setMaxSpeed(customMaxSpeed);
                if(nextLocation.getBlock().type == "POWERED_RAIL"){
                    event.getVehicle().setVelocity(event.getVehicle().getVelocity().multiply(seedMultiplyer));
                }
            } else {
                event.getVehicle().setMaxSpeed(defaultMaxSpeed);
            }

        
            // Check if the next position is a powered rail

            if(!(nextLocation.getBlock().type == "POWERED_RAIL" || nextLocation.getBlock().type == "RAILS" || nextLocation.getBlock().type == "DETECTOR_RAIL")){
                event.getVehicle().setMaxSpeed(defaultMaxSpeed);
            }
        }
    
    
})
