var behaviour = new Creep.Behaviour('melee');
behaviour.run = function(creep) {
    if( creep.room.situation.invasion && (!creep.action || creep.action.name != 'defending') )
        Creep.action.defending.assign(creep);
    else {
        if( !creep.flag ) {
            let flag = FlagDir.find(FLAG_COLOR.invade, creep.pos, false);
            if( !flag ) flag = FlagDir.find(FLAG_COLOR.destroy, creep.pos, false);
            if( flag ){
                if( Creep.action.invading.assign(creep, flag) )
                    Population.registerCreepFlag(creep, flag);
            }
        }
    }
    if( creep.action == null ) {
        this.nextAction(creep);
    }
    // Do some work
    if( creep.action && creep.target ) {
        creep.action.step(creep);
    }
};
behaviour.nextAction = function(creep){ 
    let priority = [
        Creep.action.guarding, 
        Creep.action.idle
    ];
    for(var iAction = 0; iAction < priority.length; iAction++) {
        var action = priority[iAction];
        if(action.isValidAction(creep) && 
            action.isAddableAction(creep) && 
            action.assign(creep)) {
                return;
        }
    }
}
module.exports = behaviour;