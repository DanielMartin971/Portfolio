let characters = [];

// This constructer function makes the playable characters in the game and then adds them to an array for easier access
function Character(name, def, hp, maxHp, mag, spd, str, armor, weapon, gold, ability1, ability2, ability3){
    this.name = name;
    this.def = def;
    this.hp = hp;
    this.maxHp = maxHp;
    this.mag = mag;
    this.spd = spd;
    this.str = str;
    this.armor = armor;
    this.weapon = weapon;
    this.gold = gold;
    this.ability1 = ability1;
    this.ability2 = ability2;
    this.ability3 = ability3;

    characters.push(this);
}

const archangel  = new Character('Archangel', 2, 40, 40, 5, 2, 9, 'Halo', 'Angelic Sword', 1000, DevilMan, Suffering, Hellfire);
const argonian   = new Character('Argonian', 4, 15, 15, 2.5, 5, 5, 'Reptilian Scales', 'Shiv', 1000, Charisma, WaterBreather, SwordsMaster);
const assassin   = new Character('Assassin', 1.5, 15, 15, 4, 7, 10, "Assassin's Cloak", 'Hidden Blade', 1000, EagleEye, SpecialsMaster, SlipperyFeet);
const azetic     = new Character('Azetic', 5, 15, 15, 2, 5, 8, "Azetic's Cloak", 'MIDA Multitool', 1500, LMFS, BloodThirsty, SunSinger);
const barbarian  = new Character('Barbarian', 6, 20, 20, 1.5, 3, 8, 'Nomad Armor', 'Club', 1000, Rampage, BluntsMaster, BDCH);
const elf        = new Character('Elf', 2, 18, 18, 10, 4, 1.5, 'Robe', 'Magic Missle', 1000, StaffsMaster, MagicBlood, SunSinger);
const fenny      = new Character('Fenny', 6, 20, 20, 3, 7, 4, "Fenny's Armor", 'Valyrian Sword', 1000, EagleEye, SunSinger, SlipperyFeet);
const gentleman  = new Character('Gentleman', 6, 28, 28, 3, 4, 6, 'Fine Tailored Suit', 'CaneSword', 2000, ExoticGent, NSOWM, SodaFlask);
const goblin     = new Character('Goblin', 4, 12, 12, 6.5, 5, 3, 'Cloak', 'Dagger', 3000, CorpseShaker, BYOG, SlipperyFeet);
const gorphin    = new Character('Gorphin', 8, 25, 25, 1, 3, 8, 'Mytheral Armor', 'Stick', 1000, DemonSlayer, CorpseShaker, DragonSlayer);
const khajiit    = new Character('Khajiit', 2.5, 15, 15, 3.5, 7, 5, 'Cloak of Darkness', 'Taloc', 1250, CorpseShaker, EagleEye, KnifesMaster);
const knight     = new Character('Knight', 7, 25, 25, 2, 4, 6, 'Knight Armor', 'Sword', 2000, SwordsMaster, LMFS, DragonSlayer);
const merchant   = new Character('Merchant', 4, 20, 20, 2, 5, 2, 'Suit', 'Glade', 10000, SharedTrade, MyVodka, ShoppingSpree);
const ninja      = new Character('Ninja', 2, 20, 20, 4, 8, 4, 'Ninja Robe', 'Katana', 1000, Charisma, DeathStare, DemonSlayer);
const skinwalker = new Character('Skinwalker', 3, 50, 50, 5, 2, 9, 'Shadow', 'Soulbane', 0, PhaseWalker, DeadAgain, TBTFM);
const werewolf   = new Character('Werewolf', 8, 40, 40, 4, 7, 15, 'Wolf Hide', 'none', 0, BloodThirsty, BromptonCocktail, Suffering);
console.log('characters loaded');
