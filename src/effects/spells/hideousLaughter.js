import { baseSpellEffect, generateStatusEffectChange } from "../specialSpells.js";
import DDBMacros from "../DDBMacros.js";

export async function hideousLaughterEffect(document) {
  let effect = baseSpellEffect(document, document.name);
  effect.changes.push(
    generateStatusEffectChange("Incapacitated"),
  );

  effect.changes.push({
    key: "flags.midi-qol.OverTime",
    mode: CONST.ACTIVE_EFFECT_MODES.OVERRIDE,
    value: "label=Hideous Laughter (End of Turn),turn=end,saveDC=@attributes.spelldc,saveAbility=wis,saveMagic=true,killAnim=true",
    priority: "20",
  });

  await DDBMacros.setItemMacroFlag(document, "spell", "hideousLaughter.js");
  effect.changes.push(DDBMacros.generateMacroChange({ macroType: "spell", macroName: "hideousLaughter.js" }));
  document.effects.push(effect);

  let proneEffect = baseSpellEffect(document, `${document.name} (Prone)`);
  proneEffect.changes.push(
    generateStatusEffectChange("Prone", 20, true),
  );
  document.effects.push(proneEffect);

  return document;
}
