export function getUnit(unit, lastGrowthStage,growthRate){
    const timeELapsed=((Date.now()-lastGrowthStage)/(1000*60*60*24));

    const growth=timeELapsed*growthRate;

    return unit+growth;
}