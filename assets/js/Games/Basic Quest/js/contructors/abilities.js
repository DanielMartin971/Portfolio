//This is a constructor function, you just input a ability at the end with the stats in place of the constructor
//Then you will get the ability pushed out

let abilities = [];

function Ability(name, desc, price){
  this.name   = name;
  this.desc   = desc;
  this.price  = price;
  this.status = false;
  
  abilities.push(this);
  
}

const BDCH             = new Ability('BDCH', 'Get a 5% discount in the shop',10000);
const BluntsMaster     = new Ability('BluntsMaster', 'Do 10% more damage with blunt weapons',10000);
const Charisma         = new Ability('Charisma', 'Get a 10% discount in the shop',10000);
const DeathStare       = new Ability('DeathStare', '5% chance to instantly kill a enemy',10000);
const DemonSlayer      = new Ability('DemonSlayer', 'Do 5% more damage to Hectic and normal enemies',10000);
const DragonSlayer     = new Ability('DragonSlayer', 'Do 10% more damage to Hectic enemies and 20% more damage to the Dragon',10000);
const EagleEye         = new Ability('EagleEye', '+20% critical hit rate',10000);
const KnifesMaster     = new Ability('KnifesMaster', 'Do 10% more damage with knives',10000);
const LMFS             = new Ability('LMFS', 'When your health is less than 25%, your defense increases by 50%',10000);
const MagicBlood       = new Ability('MagicBlood', 'Take 10% less damage from magic attacks',10000);
const Rampage          = new Ability('Rampage', 'When your health is less than 25%, your strength increases by 50%',10000);
const SpecialsMaster   = new Ability('SpecialsMaster', 'Do 10% more damage with special weapons',10000);
const StaffsMaster     = new Ability('StaffsMaster', 'Do 10% more damage with staff weapons',10000);
const SwordsMaster     = new Ability('SwordsMaster', 'Do 10% more damage with sword weapons',10000);
const AbyssSurvivor    = new Ability('AbyssSurvivor', 'Do 10% more damage to AbyssWalker and take 25% less damage from him',15000);
const Afterlife        = new Ability('Afterlife', '30% chance to come back to life as a Archangel',30000);
const BloodThirsty     = new Ability('BloodThirsty', 'Every kill gives you 5 hp',15000);
const BromptonCocktail = new Ability('BromptonCocktail', 'Flasks only give you 25% hp but your dodge % increases by 50',15000);
const BuffaloPower     = new Ability('BuffaloPower', 'Increase flask slots by 1, 10% increased attack damage, 5% increased defense, 10% increase in sale prices',15000);
const BYOG             = new Ability('BYOG', '2% chance to steal item in shop',15000);
const CanceredBlood    = new Ability('CanceredBlood', 'Lose 1 hp every 5 seconds but increase stength and magic by 4',15000);
const CheapShot        = new Ability('CheapShot', '20% chance to hit enemy without receiving damage but 10% increase in prices',15000);
const CorpseShaker     = new Ability('CorspeShaker', 'Receive 10% more gold and 5% increased chance to find loot',15000);
const CrossFaded       = new Ability('CrossFaded', '10% increase in prices, take 10% more damage, deal 10% more damage, and 10% chance to not use a flask',15000);
const CursedSoul       = new Ability('CursedSoul', 'Decrease all stats by 1 and increase max hp by 10',15000);
const DeadAgain        = new Ability('DeadAgain', '10% chance to come back to life with 1 hp and another flask',20000);
const DevilMan         = new Ability("Devil'sMan", 'Increase all stats by 1 and decrease max hp by 10',15000);
const ExoticGent       = new Ability("ExoticGent", '15% decrease in prices and 5% increase damage to hectics',15000);
const Fan              = new Ability("FAN", 'Do 20% more magic damage and take 5% less magic damage',20000);
const Hellfire         = new Ability("Hellfire", 'Do 10% increased damage with all weapon types',20000);
const HopelessRomantic = new Ability("HopelessRomantic", '-50% hp but increase dodge% by 50',17500);
const Medic            = new Ability("Medic!", '10% increase heal rate',15000);
const MyVodka          = new Ability("MyVodka!", 'Increase loot chance by 10%',15000);
const NaturalBarterer  = new Ability("NaturalBarterer", 'Get 20% more gold for items sold',15000);
const NSOWM            = new Ability("NSOWM", 'Increase flask slots by 3',15000);
const OneManArmy       = new Ability("OneManArmy", 'Lose 25% maxHp and when hp is less than 25%, increase strength and defense by 50%',15000);
const PhaseWalker      = new Ability("PhaseWalker", '50% increased chance to dodge but lose 50% of your flask slots',15000);
const RebornAgain      = new Ability("RebornAgain", '10% chance to come back to life with full hp and no flasks',25000);
const RoyalBlood       = new Ability("RoyalBlood", '20% decrease in prices and take 5% more damage',20000);
const SharedTrade      = new Ability("SharedTrade", '40% decreased prices and get 5% more gold for items sold',25000);
const ShoppingSpree    = new Ability("ShoppingSpree", '10% increased chance to get merchants to spawn',20000);
const SodaFlask        = new Ability("SodaFlask", '15% chance to not use a flask when healing',25000);
const Suffering        = new Ability("Suffering", 'When hp is less than 25%, your attack increases by 75% but your defense decreases by 50%',15000);
const SunSinger        = new Ability("SunSinger", '5% chance to come back to life with full hp and flasks',25000);
const TBTFM            = new Ability("TBTFM", '10% chance to kill enemy upon death and revive with full hp',15000);
const WaterBreather    = new Ability("WaterBreather", 'Does literally nothing',15000);
const SlipperyFeet     = new Ability("WaterBreather", 'Does literally nothing',15000);
console.log('abilities loaded');














