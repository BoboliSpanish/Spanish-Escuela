// ============================================================
// CONTENT DATA — Skills, Diagnostic Questions, Lessons, Reference
// Level target: false-beginner / Spanish 2 refresher through
// intermediate. Edit or extend freely — this is plain data.
// ============================================================

const SKILLS = [
  { id: "present",      label: "Present tense",              group: "Verbs" },
  { id: "ser_estar",     label: "Ser vs. Estar",              group: "Verbs" },
  { id: "preterite",     label: "Preterite (past)",           group: "Verbs" },
  { id: "imperfect",     label: "Imperfect (past)",           group: "Verbs" },
  { id: "pret_vs_imp",   label: "Preterite vs. Imperfect",    group: "Verbs" },
  { id: "reflexive",     label: "Reflexive verbs",            group: "Verbs" },
  { id: "gustar",        label: "Gustar-type verbs",          group: "Verbs" },
  { id: "subjunctive",   label: "Present subjunctive",        group: "Verbs" },
  { id: "object_pron",   label: "Object pronouns",            group: "Grammar" },
  { id: "por_para",      label: "Por vs. Para",               group: "Grammar" },
  { id: "adj_agreement", label: "Adjective agreement",        group: "Grammar" },
  { id: "comparatives",  label: "Comparatives & superlatives",group: "Grammar" },
  { id: "question_words",label: "Question words & syntax",    group: "Grammar" },
  { id: "vocab_daily",   label: "Vocabulary: daily life",     group: "Vocabulary" },
  { id: "commands",      label: "Commands (imperative)",      group: "Verbs" },
  { id: "future",        label: "Future tense",                group: "Verbs" },
  { id: "conditional",   label: "Conditional tense",           group: "Verbs" },
];

// ------------------------------------------------------------
// DIAGNOSTIC QUESTIONS
// Each: skill, difficulty (1 easy - 3 hard), prompt, options,
// answer (index), explain (shown after answering)
// ------------------------------------------------------------
const QUESTIONS = [
  // present
  { skill:"present", difficulty:1, prompt:"Yo ___ en Madrid.", options:["vivo","vive","vives","viven"], answer:0,
    explain:"'Vivir' → yo vivo. First-person singular -ir verbs drop -ir and add -o." },
  { skill:"present", difficulty:1, prompt:"Nosotros ___ (hablar) español en casa.", options:["hablamos","hablan","hablas","habla"], answer:0,
    explain:"Regular -ar verb, nosotros form: habl- + -amos." },
  { skill:"present", difficulty:2, prompt:"Nosotros ___ (tener) mucha tarea hoy.", options:["tenemos","tienen","tenéis","tengo"], answer:0,
    explain:"'Tener' is irregular in most forms but regular (-emos) for nosotros: tenemos." },
  { skill:"present", difficulty:2, prompt:"Ella ___ (pedir) un café todas las mañanas.", options:["pide","pido","pedes","piden"], answer:0,
    explain:"'Pedir' is a stem-changing e→i verb: pido, pides, pide, pedimos, piden." },
  { skill:"present", difficulty:3, prompt:"¿Cuál es la forma correcta de 'oír' para 'tú'?", options:["oyes","oes","oías","oigo"], answer:0,
    explain:"'Oír' has a spelling change: oigo, oyes, oye, oímos, oyen." },

  // ser_estar
  { skill:"ser_estar", difficulty:1, prompt:"Mi hermana ___ doctora.", options:["es","está","son","están"], answer:0,
    explain:"Profession/identity → ser. 'Es doctora.'" },
  { skill:"ser_estar", difficulty:1, prompt:"La sopa ___ muy caliente ahora mismo.", options:["está","es","son","fueron"], answer:0,
    explain:"Temporary condition (temperature right now) → estar." },
  { skill:"ser_estar", difficulty:2, prompt:"Juan ___ aburrido en la fiesta (se siente así ahora).", options:["está","es","fue","son"], answer:0,
    explain:"'Estar aburrido' = feels bored right now. 'Ser aburrido' would mean he IS a boring person — different meaning entirely." },
  { skill:"ser_estar", difficulty:3, prompt:"El concierto ___ en el estadio municipal.", options:["es","está","fue","estará"], answer:0,
    explain:"For events (where something takes place / is held), Spanish uses 'ser', not 'estar' — even though it feels like location." },

  // preterite
  { skill:"preterite", difficulty:1, prompt:"Ayer yo ___ (comer) tacos.", options:["comí","como","comía","comiendo"], answer:0,
    explain:"Preterite for a completed past action: comí (yo, -er verb)." },
  { skill:"preterite", difficulty:1, prompt:"Ella ___ (hablar) con su jefe ayer.", options:["habló","habla","hablaba","hablando"], answer:0,
    explain:"Regular -ar preterite, third person singular: habl- + -ó." },
  { skill:"preterite", difficulty:2, prompt:"Ellos ___ (ir) al cine el sábado.", options:["fueron","iban","van","fue"], answer:0,
    explain:"'Ir' preterite is irregular: fui, fuiste, fue, fuimos, fueron (identical to 'ser' preterite)." },
  { skill:"preterite", difficulty:2, prompt:"¿___ (tú / hacer) la tarea anoche?", options:["Hiciste","Haces","Hacías","Hago"], answer:0,
    explain:"'Hacer' preterite: hice, hiciste, hizo, hicimos, hicieron." },
  { skill:"preterite", difficulty:3, prompt:"El año pasado, nosotros ___ (estar) en México por dos semanas.", options:["estuvimos","estábamos","estamos","estuvieron"], answer:0,
    explain:"'Estar' preterite is irregular: estuve, estuviste, estuvo, estuvimos, estuvieron." },

  // imperfect
  { skill:"imperfect", difficulty:1, prompt:"Cuando era niña, ella ___ (jugar) en el parque todos los días.", options:["jugaba","jugó","juega","jugará"], answer:0,
    explain:"Imperfect describes repeated/habitual past actions: jugaba (used to play)." },
  { skill:"imperfect", difficulty:1, prompt:"Nosotros ___ (vivir) en Chicago de niños.", options:["vivíamos","vivimos","vivíanos","vivamos"], answer:0,
    explain:"Regular -ir imperfect, nosotros form: viv- + -íamos." },
  { skill:"imperfect", difficulty:2, prompt:"Nosotros ___ (ser) muy jóvenes en esa época.", options:["éramos","fuimos","somos","seríamos"], answer:0,
    explain:"'Ser' imperfect is irregular: era, eras, era, éramos, eran — used for ongoing states in the past." },
  { skill:"imperfect", difficulty:2, prompt:"Mientras yo ___ (leer), mi madre cocinaba.", options:["leía","leí","leo","leyó"], answer:0,
    explain:"Background/ongoing action set against another action → imperfect: leía." },

  // pret_vs_imp
  { skill:"pret_vs_imp", difficulty:2, prompt:"Yo ___ (dormir) cuando el teléfono ___ (sonar).", options:["dormía / sonó","dormí / sonaba","dormía / sonaba","dormí / sonó"], answer:0,
    explain:"Ongoing background action (imperfect: dormía) interrupted by a single completed event (preterite: sonó)." },
  { skill:"pret_vs_imp", difficulty:2, prompt:"Todos los veranos, nosotros ___ (ir) a la playa, pero el verano pasado no ___ (poder).", options:["íbamos / pudimos","fuimos / podíamos","íbamos / podíamos","fuimos / pudimos"], answer:0,
    explain:"The recurring habit ('every summer') is imperfect (íbamos); the one specific exception is preterite (pudimos)." },
  { skill:"pret_vs_imp", difficulty:3, prompt:"De niño, ___ (ir, yo) a la playa cada verano, pero un año no ___ (poder) ir.", options:["iba / pude","fui / podía","iba / pudo","fui / pude"], answer:0,
    explain:"Habitual repeated action → imperfect (iba). The one specific exception year → preterite (pude/no pude)." },
  { skill:"pret_vs_imp", difficulty:3, prompt:"¿Qué frase describe mejor una acción ÚNICA y completada?", options:["Ayer llovió toda la tarde.","Llovía mucho ese verano.","Siempre llovía en abril.","Llovía cuando salí."], answer:0,
    explain:"'Ayer llovió toda la tarde' frames it as one finished event with a clear endpoint — preterite territory." },

  // reflexive
  { skill:"reflexive", difficulty:1, prompt:"Yo ___ (levantarse) a las siete.", options:["me levanto","levanto","se levanta","te levantas"], answer:0,
    explain:"Reflexive pronoun must match the subject: yo → me. 'Me levanto.'" },
  { skill:"reflexive", difficulty:1, prompt:"Ellos ___ (lavarse) las manos antes de comer.", options:["se lavan","lavan","nos lavamos","se lava"], answer:0,
    explain:"Ellos → reflexive pronoun 'se', verb 'lavan': se lavan." },
  { skill:"reflexive", difficulty:2, prompt:"¿A qué hora ___ (ustedes / acostarse)?", options:["se acuestan","acuestan","se acuesta","nos acostamos"], answer:0,
    explain:"Ustedes → se acuestan (stem-changing o→ue, reflexive pronoun 'se')." },
  { skill:"reflexive", difficulty:2, prompt:"Elige la oración correcta:", options:["Ella se lava las manos.","Ella lava se las manos.","Ella las manos se lava.","Ella lava las manos se."], answer:0,
    explain:"Reflexive pronoun goes directly before the conjugated verb: 'se lava'." },

  // gustar
  { skill:"gustar", difficulty:1, prompt:"A mí ___ el chocolate.", options:["me gusta","me gustan","gusto","le gusta"], answer:0,
    explain:"'Chocolate' is singular, so the verb is 'gusta', with indirect object pronoun 'me'." },
  { skill:"gustar", difficulty:1, prompt:"A nosotros ___ el fútbol.", options:["nos gusta","nos gustan","gustamos","les gusta"], answer:0,
    explain:"'Fútbol' is singular → gusta, with indirect object pronoun 'nos' for nosotros." },
  { skill:"gustar", difficulty:2, prompt:"A ella ___ las películas de terror.", options:["le gustan","le gusta","la gusta","gustan"], answer:0,
    explain:"'Películas' is plural → gustan. Indirect object pronoun 'le' refers to 'ella'." },
  { skill:"gustar", difficulty:2, prompt:"¿Qué verbo NO sigue el mismo patrón que 'gustar'?", options:["hablar","interesar","encantar","molestar"], answer:0,
    explain:"'Interesar', 'encantar', and 'molestar' all work like 'gustar' (grammatical subject is the thing, not the person). 'Hablar' is conjugated normally with the person as subject." },

  // subjunctive
  { skill:"subjunctive", difficulty:2, prompt:"Espero que tú ___ (venir) a la fiesta.", options:["vengas","vienes","vendrás","vinieras"], answer:0,
    explain:"'Espero que' triggers the subjunctive: vengas (present subjunctive of venir)." },
  { skill:"subjunctive", difficulty:2, prompt:"Ojalá que nosotros ___ (ganar) el partido.", options:["ganemos","ganamos","ganaremos","ganáramos"], answer:0,
    explain:"'Ojalá que' (I hope/wish) always triggers subjunctive: ganemos." },
  { skill:"subjunctive", difficulty:3, prompt:"Es importante que nosotros ___ (llegar) a tiempo.", options:["lleguemos","llegamos","llegaremos","llegábamos"], answer:0,
    explain:"Impersonal expressions of importance/necessity trigger subjunctive: lleguemos." },
  { skill:"subjunctive", difficulty:3, prompt:"No creo que él ___ (tener) razón.", options:["tenga","tiene","tendrá","tuviera"], answer:0,
    explain:"'No creo que' (doubt/disbelief) triggers subjunctive: tenga." },

  // object_pron
  { skill:"object_pron", difficulty:1, prompt:"¿Tienes el libro? Sí, ___ tengo.", options:["lo","la","le","los"], answer:0,
    explain:"'El libro' is masculine singular → direct object pronoun 'lo'." },
  { skill:"object_pron", difficulty:1, prompt:"¿Compraste las manzanas? Sí, ___ compré.", options:["las","los","la","le"], answer:0,
    explain:"'Las manzanas' is feminine plural → direct object pronoun 'las'." },
  { skill:"object_pron", difficulty:2, prompt:"Voy a dar___ el regalo a mi mamá.", options:["le","la","lo","les"], answer:0,
    explain:"Indirect object pronoun for 'a mi mamá' → le. (Full sentence: Voy a darle el regalo a mi mamá.)" },
  { skill:"object_pron", difficulty:2, prompt:"___ escribí una carta a mis abuelos.", options:["Les","Los","Las","Le"], answer:0,
    explain:"'A mis abuelos' is plural → indirect object pronoun 'les'." },
  { skill:"object_pron", difficulty:3, prompt:"¿Le diste las llaves a Pedro? Sí, ___ di ayer.", options:["se las","le las","se los","les las"], answer:0,
    explain:"When indirect (le) and direct (las) object pronouns combine, 'le' becomes 'se': se las di." },

  // por_para
  { skill:"por_para", difficulty:1, prompt:"Este regalo es ___ ti.", options:["para","por","de","a"], answer:0,
    explain:"'Para' marks the recipient/beneficiary of something." },
  { skill:"por_para", difficulty:1, prompt:"Gracias ___ tu ayuda.", options:["por","para","de","con"], answer:0,
    explain:"'Por' expresses the reason/cause behind gratitude." },
  { skill:"por_para", difficulty:2, prompt:"Caminamos ___ el parque toda la tarde.", options:["por","para","en","a"], answer:0,
    explain:"'Por' expresses movement through/around a space." },
  { skill:"por_para", difficulty:2, prompt:"Necesito terminar esto ___ el viernes.", options:["para","por","en","a"], answer:0,
    explain:"'Para' marks a deadline — the point something is aimed toward." },
  { skill:"por_para", difficulty:3, prompt:"Lo hice ___ amor, no ___ dinero.", options:["por / por","para / para","por / para","para / por"], answer:0,
    explain:"'Por' expresses the motive/reason behind an action — both blanks here describe cause, so both are 'por'." },

  // adj_agreement
  { skill:"adj_agreement", difficulty:1, prompt:"Las casas ___ (blanco).", options:["blancas","blanco","blancos","blanca"], answer:0,
    explain:"'Casas' is feminine plural → blancas." },
  { skill:"adj_agreement", difficulty:1, prompt:"Tengo un perro ___ (pequeño).", options:["pequeño","pequeña","pequeños","pequeñas"], answer:0,
    explain:"'Perro' is masculine singular → pequeño." },
  { skill:"adj_agreement", difficulty:2, prompt:"Un ___ (grande) problema.", options:["gran","grande","grandes","granes"], answer:0,
    explain:"'Grande' shortens to 'gran' before a singular noun (m. or f.) when it means 'great', not 'big'." },
  { skill:"adj_agreement", difficulty:2, prompt:"Elige la oración correcta:", options:["Tengo un carro nuevo.","Tengo una carro nuevo.","Tengo un carro nueva.","Tengo unos carro nuevo."], answer:0,
    explain:"'Carro' is masculine singular; article and adjective must agree: un carro nuevo." },

  // comparatives
  { skill:"comparatives", difficulty:1, prompt:"Mi hermano es ___ alto ___ yo.", options:["más / que","más / de","tan / que","menos / a"], answer:0,
    explain:"Comparative of superiority: más + adjective + que." },
  { skill:"comparatives", difficulty:1, prompt:"Ella tiene ___ dinero ___ yo (less).", options:["menos / que","más / que","tan / como","menos / de"], answer:0,
    explain:"Comparative of inferiority: menos + noun + que." },
  { skill:"comparatives", difficulty:2, prompt:"Ella es ___ inteligente ___ su hermana (equal).", options:["tan / como","más / que","menos / que","tanto / como"], answer:0,
    explain:"Equal comparison with an adjective: tan + adjective + como." },
  { skill:"comparatives", difficulty:2, prompt:"Esta es la ciudad ___ bonita del país.", options:["más","tan","tanta","tan bien"], answer:0,
    explain:"Superlative: el/la/los/las + más + adjective (+ de + group)." },

  // question_words
  { skill:"question_words", difficulty:1, prompt:"___ te llamas?", options:["Cómo","Qué","Cuál","Quién"], answer:0,
    explain:"'¿Cómo te llamas?' — asking for name uses 'cómo', not 'qué'." },
  { skill:"question_words", difficulty:1, prompt:"¿___ vives?", options:["Dónde","Qué","Cuál","Cuándo"], answer:0,
    explain:"'¿Dónde vives?' asks about location." },
  { skill:"question_words", difficulty:2, prompt:"¿___ es tu número de teléfono?", options:["Cuál","Qué","Cómo","Quién"], answer:0,
    explain:"'Cuál' is used to ask 'which one' among options — appropriate for a specific piece of info like a phone number." },
  { skill:"question_words", difficulty:2, prompt:"Reordena: '¿tienes / cuántos / hermanos?'", options:["¿Cuántos hermanos tienes?","¿Tienes cuántos hermanos?","¿Hermanos cuántos tienes?","¿Cuántos tienes hermanos?"], answer:0,
    explain:"Question word leads the sentence: ¿Cuántos hermanos tienes?" },

  // vocab_daily
  { skill:"vocab_daily", difficulty:1, prompt:"'To go grocery shopping' =", options:["hacer la compra","hacer la cama","hacer las maletas","hacer ejercicio"], answer:0,
    explain:"'Hacer la compra' = to do the grocery shopping." },
  { skill:"vocab_daily", difficulty:1, prompt:"'Alarm clock' =", options:["el despertador","el reloj de pared","la alarma de coche","el timbre"], answer:0,
    explain:"'El despertador' specifically means alarm clock." },
  { skill:"vocab_daily", difficulty:1, prompt:"'To take a walk' =", options:["dar un paseo","dar la vuelta","hacer paso","tomar aire"], answer:0,
    explain:"'Dar un paseo' is the standard phrase for taking a walk." },
  { skill:"vocab_daily", difficulty:2, prompt:"'I'm running late' =", options:["Voy tarde","Estoy tardando","Soy tarde","Voy con tarde"], answer:0,
    explain:"'Voy tarde' is the natural idiom for running late." },

  // commands
  { skill:"commands", difficulty:1, prompt:"___ (hablar, tú) más despacio.", options:["Habla","Hablas","Hables","Hablar"], answer:0,
    explain:"Informal affirmative tú commands borrow the él/ella present-tense form: habla." },
  { skill:"commands", difficulty:1, prompt:"___ (comer, usted) las verduras.", options:["Coma","Come","Comes","Comer"], answer:0,
    explain:"Formal usted commands use the present subjunctive form: coma." },
  { skill:"commands", difficulty:2, prompt:"No ___ (hablar, tú) tan rápido.", options:["hables","habla","hablas","hablo"], answer:0,
    explain:"Negative tú commands switch to the present subjunctive: no hables." },
  { skill:"commands", difficulty:2, prompt:"___ (cerrar, ustedes) la puerta, por favor.", options:["Cierren","Cierran","Cierra","Cierre"], answer:0,
    explain:"Ustedes commands use the present subjunctive ustedes form: cierren." },
  { skill:"commands", difficulty:3, prompt:"___ (poner, tú) la mesa.", options:["Pon","Pones","Ponga","Pongas"], answer:0,
    explain:"'Poner' has an irregular affirmative tú command: pon (not the expected 'pona')." },
  { skill:"commands", difficulty:3, prompt:"No ___ (ir, tú) allí solo.", options:["vayas","vas","va","ve"], answer:0,
    explain:"Negative tú command of 'ir' uses the subjunctive: no vayas." },

  // future
  { skill:"future", difficulty:1, prompt:"Yo ___ (viajar) a España el próximo año.", options:["viajaré","viajo","viajaba","viajaría"], answer:0,
    explain:"Regular future: add -é directly to the infinitive, viajar+é." },
  { skill:"future", difficulty:1, prompt:"Nosotros ___ (comer) a las ocho.", options:["comeremos","comemos","comíamos","comeríamos"], answer:0,
    explain:"Regular future, nosotros: comer+emos." },
  { skill:"future", difficulty:2, prompt:"Ella ___ (tener) tiempo mañana.", options:["tendrá","tendría","tenía","tiene"], answer:0,
    explain:"'Tener' has an irregular future stem: tendr-, + á for ella." },
  { skill:"future", difficulty:2, prompt:"Tú ___ (hacer) la tarea esta noche.", options:["harás","haces","hacías","harías"], answer:0,
    explain:"'Hacer' has an irregular future stem: har-, + ás for tú." },
  { skill:"future", difficulty:3, prompt:"Nosotros ___ (poder) ir a la fiesta.", options:["podremos","podemos","podríamos","podíamos"], answer:0,
    explain:"'Poder' has an irregular future stem: podr-, + emos for nosotros." },
  { skill:"future", difficulty:3, prompt:"Ellos ___ (salir) temprano mañana.", options:["saldrán","salen","saldrían","salían"], answer:0,
    explain:"'Salir' has an irregular future stem: saldr-, + án for ellos." },

  // conditional
  { skill:"conditional", difficulty:1, prompt:"Yo ___ (viajar) si tuviera dinero.", options:["viajaría","viajaré","viajaba","viajo"], answer:0,
    explain:"Regular conditional: add -ía directly to the infinitive, viajar+ía." },
  { skill:"conditional", difficulty:1, prompt:"Nosotros ___ (comer) allí si pudiéramos.", options:["comeríamos","comeremos","comíamos","comemos"], answer:0,
    explain:"Regular conditional, nosotros: comer+íamos." },
  { skill:"conditional", difficulty:2, prompt:"Ella ___ (tener) más tiempo si no trabajara tanto.", options:["tendría","tendrá","tenía","tiene"], answer:0,
    explain:"Same irregular stem as the future (tendr-), + ía for ella." },
  { skill:"conditional", difficulty:2, prompt:"¿___ (tú / poder) ayudarme?", options:["Podrías","Puedes","Podrás","Pudiste"], answer:0,
    explain:"Conditional 'podrías' softens a request — a common polite pattern." },
  { skill:"conditional", difficulty:3, prompt:"Nosotros ___ (decir) la verdad en esa situación.", options:["diríamos","decimos","dijimos","diremos"], answer:0,
    explain:"'Decir' has an irregular stem (dir-) shared by future and conditional, + íamos for nosotros." },
  { skill:"conditional", difficulty:3, prompt:"Yo ___ (querer) más información antes de decidir.", options:["querría","quiero","quería","querré"], answer:0,
    explain:"Conditional of 'querer' softens the request; in casual speech many people say 'quisiera' instead, which is also polite but is actually an imperfect subjunctive form doing the same job." },
];

// ------------------------------------------------------------
// LESSONS
// Each skill has 1-2 short lessons: explanation + examples +
// a few practice items (self-check, not scored diagnostically
// but do feed a small score bump on completion).
// ------------------------------------------------------------
const LESSONS = {
  present: [{
    title: "Present tense — regulars & the 'shoe verbs'",
    explain: "Regular verbs drop -ar/-er/-ir and add endings (habl-o, com-o, viv-o). Some verbs change their stem in every form except nosotros/vosotros — nicknamed 'shoe verbs' because of the boot shape they trace on a conjugation chart (e→ie: querer→quiero; o→ue: poder→puedo; e→i: pedir→pido).",
    examples: ["Yo hablo español todos los días.", "Ella quiere un café.", "Nosotros pedimos la cuenta."],
    practice: [
      { prompt: "Tú ___ (querer) salir esta noche.", answer: "quieres" },
      { prompt: "Ellos ___ (poder) venir mañana.", answer: "pueden" },
      { prompt: "Yo ___ (pedir) ayuda.", answer: "pido" },
      { prompt: "Nosotros ___ (dormir) ocho horas.", answer: "dormimos" },
      { prompt: "Ella ___ (empezar) la clase a las nueve.", answer: "empieza" },
      { prompt: "Ustedes ___ (jugar) al fútbol los sábados.", answer: "juegan" },
      { prompt: "Yo ___ (salir) de casa a las siete.", answer: "salgo" },
      { prompt: "Él ___ (decir) siempre la verdad.", answer: "dice" },
      { prompt: "Nosotros ___ (tener) prisa hoy.", answer: "tenemos" },
      { prompt: "Ellas ___ (venir) a la fiesta esta noche.", answer: "vienen" },
    ],
  }],
  ser_estar: [{
    title: "Ser vs. Estar — the core split",
    explain: "Ser = identity, characteristics, origin, time, events (what something IS at its core). Estar = location, condition, ongoing action (how something IS right now). Some adjectives change meaning entirely depending on which verb you use: 'ser listo' (to be clever) vs 'estar listo' (to be ready).",
    examples: ["Soy de California. (origin — ser)", "Estoy cansada hoy. (condition — estar)", "La reunión es a las tres. (event — ser)"],
    practice: [
      { prompt: "Mis padres ___ de México.", answer: "son" },
      { prompt: "El café ___ frío ya.", answer: "está" },
      { prompt: "Ella ___ lista para el examen (prepared).", answer: "está" },
      { prompt: "Nosotros ___ estudiantes.", answer: "somos" },
      { prompt: "La puerta ___ abierta.", answer: "está" },
      { prompt: "Hoy ___ lunes.", answer: "es" },
      { prompt: "¿Cómo ___ tú? (feeling right now)", answer: "estás" },
      { prompt: "El libro ___ sobre la mesa.", answer: "está" },
      { prompt: "Mi tío ___ médico.", answer: "es" },
      { prompt: "Los niños ___ cansados después de jugar.", answer: "están" },
    ],
  }],
  preterite: [{
    title: "Preterite — snapshots of the past",
    explain: "Use the preterite for actions with a clear beginning and end — something that happened and finished. Watch for irregular stems: tener→tuv-, estar→estuv-, hacer→hic-, ir/ser→fu-.",
    examples: ["Anoche cociné pasta.", "El mes pasado fuimos a Perú.", "Ella tuvo un examen el viernes."],
    practice: [
      { prompt: "Yo ___ (hacer) la cena anoche.", answer: "hice" },
      { prompt: "Nosotros ___ (ir) al mercado ayer.", answer: "fuimos" },
      { prompt: "Ella ___ (comprar) un vestido nuevo.", answer: "compró" },
      { prompt: "Tú ___ (llegar) tarde otra vez.", answer: "llegaste" },
      { prompt: "Ellos ___ (ver) una película anoche.", answer: "vieron" },
      { prompt: "Yo ___ (dar) un regalo a mi hermana.", answer: "di" },
      { prompt: "Nosotros ___ (decir) la verdad.", answer: "dijimos" },
      { prompt: "Ella ___ (poner) la mesa antes de cenar.", answer: "puso" },
      { prompt: "Ustedes ___ (venir) temprano.", answer: "vinieron" },
      { prompt: "Yo ___ (leer) el libro completo.", answer: "leí" },
    ],
  }],
  imperfect: [{
    title: "Imperfect — the ongoing backdrop",
    explain: "The imperfect paints the scenery: habits, repeated actions, descriptions, and background states in the past — with no defined endpoint. Only three verbs are irregular: ser (era), ir (iba), ver (veía).",
    examples: ["Cuando era pequeña, vivía en Texas.", "Siempre íbamos a la playa en julio.", "Hacía calor esa tarde."],
    practice: [
      { prompt: "De niño, yo ___ (jugar) fútbol cada fin de semana.", answer: "jugaba" },
      { prompt: "Ellos ___ (ser) muy amables.", answer: "eran" },
      { prompt: "Nosotros ___ (vivir) en una casa pequeña.", answer: "vivíamos" },
      { prompt: "Tú siempre ___ (llegar) a tiempo.", answer: "llegabas" },
      { prompt: "Ella ___ (tener) mucho miedo de noche.", answer: "tenía" },
      { prompt: "Yo ___ (ir) a la escuela a pie.", answer: "iba" },
      { prompt: "Hacía sol y los pájaros ___ (cantar).", answer: "cantaban" },
      { prompt: "Nosotros ___ (ver) televisión todas las tardes.", answer: "veíamos" },
      { prompt: "Mis abuelos ___ (vivir) en el campo.", answer: "vivían" },
      { prompt: "Yo ___ (ser) muy tímido de pequeño.", answer: "era" },
    ],
  }],
  pret_vs_imp: [{
    title: "Choosing preterite vs. imperfect",
    explain: "Think of imperfect as the video playing in the background, and preterite as the single photo snapshot that interrupts it. A classic pattern: 'Yo dormía (imperfect - was sleeping) cuando sonó (preterite - rang, one event) el teléfono.'",
    examples: ["Llovía (bg) cuando salimos (event).", "Ella leía un libro cuando la llamé."],
    practice: [
      { prompt: "Yo ___ (caminar) por la calle cuando ___ (ver) a mi amigo.", answer: "caminaba / vi" },
      { prompt: "Ella ___ (dormir) cuando sonó el teléfono.", answer: "dormía" },
      { prompt: "Nosotros ___ (comer) cuando empezó a llover.", answer: "comíamos" },
      { prompt: "De niño, ___ (ir) a la playa cada verano, pero un año no ___ (poder) ir.", answer: "iba / pude" },
      { prompt: "Ayer ___ (llover) toda la tarde (one finished event).", answer: "llovió" },
      { prompt: "Todos los días ella ___ (leer) el periódico.", answer: "leía" },
      { prompt: "Anoche yo ___ (leer) un capítulo completo.", answer: "leí" },
      { prompt: "Mientras tú ___ (cocinar), yo puse la mesa.", answer: "cocinabas" },
      { prompt: "El año pasado nosotros ___ (viajar) a España.", answer: "viajamos" },
      { prompt: "Cuando era joven, mi padre ___ (trabajar) en una fábrica.", answer: "trabajaba" },
    ],
  }],
  reflexive: [{
    title: "Reflexive verbs — action returns to the subject",
    explain: "Reflexive verbs describe actions the subject does to themself: levantarse, ducharse, vestirse, acostarse. The pronoun (me/te/se/nos/se) always matches the subject and usually goes right before the conjugated verb.",
    examples: ["Me despierto a las seis.", "¿Cómo te sientes hoy?", "Los niños se visten solos."],
    practice: [
      { prompt: "Yo ___ (bañarse) antes de dormir.", answer: "me baño" },
      { prompt: "¿A qué hora ___ (tú / despertarse)?", answer: "te despiertas" },
      { prompt: "Ellos ___ (vestirse) rápido.", answer: "se visten" },
      { prompt: "Nosotros ___ (sentarse) en el sofá.", answer: "nos sentamos" },
      { prompt: "Ella ___ (maquillarse) cada mañana.", answer: "se maquilla" },
      { prompt: "¿Cómo ___ (ustedes / llamarse)?", answer: "se llaman" },
      { prompt: "Yo ___ (cepillarse) los dientes dos veces al día.", answer: "me cepillo" },
      { prompt: "Él ___ (afeitarse) todos los días.", answer: "se afeita" },
      { prompt: "Nosotros ___ (dormirse) tarde los viernes.", answer: "nos dormimos" },
      { prompt: "Tú ___ (ducharse) por la mañana.", answer: "te duchas" },
    ],
  }],
  gustar: [{
    title: "Gustar — flip the sentence structure",
    explain: "In English, the person is the subject: 'I like tacos.' In Spanish, the thing liked is the subject and the person becomes an indirect object: 'Me gustan los tacos' (literally, 'tacos are pleasing to me'). Match gusta/gustan to what's liked, not to the person.",
    examples: ["Me gusta el café.", "Nos gustan las playas.", "¿Te interesa la historia?"],
    practice: [
      { prompt: "A nosotros ___ (gustar) los tacos.", answer: "nos gustan" },
      { prompt: "A él ___ (encantar) la música clásica.", answer: "le encanta" },
      { prompt: "A mí ___ (interesar) la historia.", answer: "me interesa" },
      { prompt: "A ellos ___ (molestar) el ruido.", answer: "les molesta" },
      { prompt: "A ti ___ (gustar) el chocolate.", answer: "te gusta" },
      { prompt: "A ella ___ (faltar) tiempo.", answer: "le falta" },
      { prompt: "A nosotros ___ (encantar) viajar.", answer: "nos encanta" },
      { prompt: "A mí ___ (gustar) las playas.", answer: "me gustan" },
      { prompt: "A ustedes ___ (interesar) los deportes.", answer: "les interesa" },
      { prompt: "A él ___ (gustar) leer novelas.", answer: "le gusta" },
    ],
  }],
  subjunctive: [{
    title: "Present subjunctive — the mood of doubt & wish",
    explain: "The subjunctive shows up after expressions of wish, doubt, emotion, or necessity, when there's a change of subject: 'Espero que (tú) vengas.' Trigger phrases to memorize: espero que, quiero que, es importante que, dudo que, ojalá que.",
    examples: ["Quiero que estudies más.", "Ojalá que llueva mañana.", "Dudo que él sepa la respuesta."],
    practice: [
      { prompt: "Espero que ella ___ (poder) venir.", answer: "pueda" },
      { prompt: "Es necesario que ustedes ___ (estudiar).", answer: "estudien" },
      { prompt: "Quiero que tú ___ (ser) feliz.", answer: "seas" },
      { prompt: "Dudo que él ___ (saber) la respuesta.", answer: "sepa" },
      { prompt: "Ojalá que ___ (llover) mañana.", answer: "llueva" },
      { prompt: "Es importante que nosotros ___ (llegar) a tiempo.", answer: "lleguemos" },
      { prompt: "No creo que ellos ___ (tener) razón.", answer: "tengan" },
      { prompt: "Espero que tú ___ (dormir) bien.", answer: "duermas" },
      { prompt: "Es posible que ella ___ (venir) tarde.", answer: "venga" },
      { prompt: "Quiero que ustedes ___ (hacer) la tarea.", answer: "hagan" },
    ],
  }],
  object_pron: [{
    title: "Object pronouns — lo, la, le, and combos",
    explain: "Direct object pronouns (lo/la/los/las) replace the thing directly receiving the action. Indirect object pronouns (le/les) mark who benefits or receives. When both appear together, le/les becomes se before lo/la/los/las.",
    examples: ["¿La tarea? Ya la hice.", "Le escribí una carta a mi abuela.", "Se lo di ayer."],
    practice: [
      { prompt: "¿Compraste el pan? Sí, ___ compré.", answer: "lo" },
      { prompt: "___ mandé un mensaje a Sara.", answer: "Le" },
      { prompt: "¿Tienes las llaves? Sí, ___ tengo.", answer: "las" },
      { prompt: "Voy a decir___ la verdad a mis padres.", answer: "les" },
      { prompt: "¿Viste a María? Sí, ___ vi ayer.", answer: "la" },
      { prompt: "Ella ___ escribió una carta a su abuelo.", answer: "le" },
      { prompt: "¿Los libros? Ya ___ leí.", answer: "los" },
      { prompt: "___ compré un regalo a mi hermana.", answer: "Le" },
      { prompt: "¿Me puedes ayudar? Sí, ___ ayudo.", answer: "te" },
      { prompt: "Se ___ di ayer (the keys, to him).", answer: "las" },
    ],
  }],
  por_para: [{
    title: "Por vs. Para — purpose vs. cause/means",
    explain: "Rough rule of thumb: PARA points forward — goal, recipient, deadline, destination. POR points to the reason behind, or movement through — cause, exchange, duration, 'through/by/for the sake of'.",
    examples: ["Para mañana, quiero terminar esto. (deadline)", "Gracias por tu ayuda. (reason)", "Viajamos por dos semanas. (duration)"],
    practice: [
      { prompt: "Este libro es ___ mi clase de historia.", answer: "para" },
      { prompt: "Pasamos ___ el centro de la ciudad.", answer: "por" },
      { prompt: "Trabajo ___ una empresa internacional.", answer: "para" },
      { prompt: "Gracias ___ tu ayuda.", answer: "por" },
      { prompt: "Necesito esto ___ el lunes.", answer: "para" },
      { prompt: "Viajamos ___ tren.", answer: "por" },
      { prompt: "Lo compré ___ diez dólares.", answer: "por" },
      { prompt: "Estudio ___ ser doctora.", answer: "para" },
      { prompt: "Caminamos ___ el parque.", answer: "por" },
      { prompt: "Este regalo es ___ ti.", answer: "para" },
    ],
  }],
  adj_agreement: [{
    title: "Adjective agreement & placement",
    explain: "Adjectives match the noun's gender and number. Most descriptive adjectives follow the noun (casa blanca), while a handful of common ones can precede it, sometimes shortening: bueno→buen, malo→mal, grande→gran, primero→primer.",
    examples: ["Unas flores rojas.", "Un buen amigo.", "La primera vez."],
    practice: [
      { prompt: "Tengo dos perros ___ (pequeño).", answer: "pequeños" },
      { prompt: "Es un ___ (malo) día.", answer: "mal" },
      { prompt: "Las flores son ___ (rojo).", answer: "rojas" },
      { prompt: "Un ___ (grande) hombre (a great man).", answer: "gran" },
      { prompt: "Mis amigas son ___ (simpático).", answer: "simpáticas" },
      { prompt: "Es la ___ (primero) vez.", answer: "primera" },
      { prompt: "Tengo un carro ___ (nuevo).", answer: "nuevo" },
      { prompt: "Las casas son ___ (blanco).", answer: "blancas" },
      { prompt: "Es un ___ (bueno) amigo.", answer: "buen" },
      { prompt: "Los libros son ___ (interesante).", answer: "interesantes" },
    ],
  }],
  comparatives: [{
    title: "Comparatives & superlatives",
    explain: "Superiority: más + adj + que. Inferiority: menos + adj + que. Equality: tan + adj + como. Superlative (the most/least in a group): el/la/los/las + más/menos + adj (+ de + group). A few irregulars: bueno→mejor, malo→peor.",
    examples: ["Es más rápido que yo.", "Es tan alta como su madre.", "Es el mejor restaurante de la ciudad."],
    practice: [
      { prompt: "Mi casa es ___ grande ___ la tuya (bigger than).", answer: "más / que" },
      { prompt: "Este pastel es ___ (bueno, superlative) de todos.", answer: "el mejor" },
      { prompt: "Ella es ___ alta ___ su hermano (equal).", answer: "tan / como" },
      { prompt: "Soy ___ rápido ___ tú.", answer: "más / que" },
      { prompt: "Este examen es ___ difícil ___ el anterior (less).", answer: "menos / que" },
      { prompt: "Es el ___ (malo, superlative) restaurante de la ciudad.", answer: "el peor" },
      { prompt: "Tengo ___ dinero ___ tú (less).", answer: "menos / que" },
      { prompt: "Ella corre ___ rápido ___ yo (as fast as).", answer: "tan / como" },
      { prompt: "Es la ciudad ___ bonita del país.", answer: "más" },
      { prompt: "Mi hermano es ___ joven ___ yo (less).", answer: "menos / que" },
    ],
  }],
  question_words: [{
    title: "Question words & word order",
    explain: "Common mix-ups: 'qué' asks for a definition/explanation ('¿Qué es esto?'), while 'cuál' asks to choose among options ('¿Cuál prefieres?'). Question words lead the sentence, and subject/verb often invert: ¿Dónde vive tu hermano? (not ¿Dónde tu hermano vive?)",
    examples: ["¿Qué significa esta palabra?", "¿Cuál es tu color favorito?", "¿Dónde trabajas?"],
    practice: [
      { prompt: "¿___ hora es? (What time)", answer: "Qué" },
      { prompt: "¿___ de estos dos prefieres?", answer: "Cuál" },
      { prompt: "¿___ vives?", answer: "Dónde" },
      { prompt: "¿___ es tu cumpleaños?", answer: "Cuándo" },
      { prompt: "¿___ hermanos tienes?", answer: "Cuántos" },
      { prompt: "¿___ te llamas?", answer: "Cómo" },
      { prompt: "¿___ es tu color favorito?", answer: "Cuál" },
      { prompt: "¿___ viene a la fiesta?", answer: "Quién" },
      { prompt: "¿___ estudias español?", answer: "Por qué" },
      { prompt: "¿___ cuesta esto?", answer: "Cuánto" },
    ],
  }],
  vocab_daily: [{
    title: "Everyday vocabulary refresh",
    explain: "High-frequency daily-life phrases that don't always translate literally — worth memorizing as chunks rather than word-by-word.",
    examples: ["hacer la compra (grocery shop)", "dar un paseo (take a walk)", "tener prisa (be in a hurry)", "quedar con alguien (to meet up with someone)"],
    practice: [
      { prompt: "'To be in a hurry' =", answer: "tener prisa" },
      { prompt: "'To take a walk' =", answer: "dar un paseo" },
      { prompt: "'To do the grocery shopping' =", answer: "hacer la compra" },
      { prompt: "'To meet up with someone' =", answer: "quedar con alguien" },
      { prompt: "'Alarm clock' =", answer: "el despertador" },
      { prompt: "'To fall asleep' =", answer: "quedarse dormido" },
      { prompt: "'To take care of' =", answer: "cuidar de" },
      { prompt: "'To be right (correct)' =", answer: "tener razón" },
      { prompt: "'To pay attention' =", answer: "prestar atención" },
      { prompt: "'To take a long time' =", answer: "tardar" },
    ],
  }],
  commands: [{
    title: "Commands (imperative) — telling people what to do",
    explain: "Informal tú commands: affirmative uses the él/ella present-tense form (habla, come, escribe); negative switches to the present subjunctive tú form (no hables, no comas). Formal usted/ustedes commands always use the subjunctive form, both affirmative and negative. A handful of tú affirmative commands are irregular and worth memorizing as a set: di, haz, ve, pon, sal, ten, ven, sé.",
    examples: ["Habla más despacio, por favor. (tú, affirmative)", "No hables tan rápido. (tú, negative)", "Coma las verduras. (usted, formal)"],
    practice: [
      { prompt: "___ (hablar, tú) con tu hermano.", answer: "Habla" },
      { prompt: "No ___ (hablar, tú) tan alto.", answer: "hables" },
      { prompt: "___ (comer, usted) despacio.", answer: "Coma" },
      { prompt: "___ (escribir, ustedes) sus nombres aquí.", answer: "Escriban" },
      { prompt: "___ (poner, tú) la mesa.", answer: "Pon" },
      { prompt: "No ___ (ir, tú) solo.", answer: "vayas" },
      { prompt: "___ (hacer, tú) la tarea ahora.", answer: "Haz" },
      { prompt: "___ (venir, tú) aquí.", answer: "Ven" },
      { prompt: "No ___ (decir, tú) mentiras.", answer: "digas" },
      { prompt: "___ (salir, usted) por esa puerta.", answer: "Salga" },
    ],
  }],
  future: [{
    title: "Future tense — will do",
    explain: "Regular future tense adds endings directly onto the infinitive, no stem changes: hablar→hablaré, comer→comeré, vivir→viviré. About a dozen common verbs use a contracted irregular stem instead: tener→tendr-, hacer→har-, poder→podr-, decir→dir-, salir→saldr-, venir→vendr-, poner→pondr-, saber→sabr-, querer→querr-. Once you've learned that stem, the endings themselves (-é, -ás, -á, -emos, -án) are always regular.",
    examples: ["Mañana hablaré con ella.", "El año que viene tendremos más tiempo.", "¿Qué harás este fin de semana?"],
    practice: [
      { prompt: "Yo ___ (viajar) a España el próximo año.", answer: "viajaré" },
      { prompt: "Nosotros ___ (comer) a las ocho.", answer: "comeremos" },
      { prompt: "Ella ___ (tener) tiempo mañana.", answer: "tendrá" },
      { prompt: "Tú ___ (hacer) la tarea esta noche.", answer: "harás" },
      { prompt: "Nosotros ___ (poder) ir a la fiesta.", answer: "podremos" },
      { prompt: "Ellos ___ (salir) temprano mañana.", answer: "saldrán" },
      { prompt: "Yo ___ (saber) el resultado pronto.", answer: "sabré" },
      { prompt: "Tú ___ (venir) a la boda, ¿verdad?", answer: "vendrás" },
      { prompt: "Nosotros ___ (poner) la mesa antes de las siete.", answer: "pondremos" },
      { prompt: "Ella ___ (decir) la verdad al final.", answer: "dirá" },
    ],
  }],
  conditional: [{
    title: "Conditional tense — would do",
    explain: "The conditional uses the exact same stems as the future — including the same dozen irregulars (tendr-, har-, podr-, dir-, saldr-, etc.) — but swaps in -ía endings instead: hablaría, comería, viviría. It's used for hypotheticals ('I would travel if...'), polite requests ('¿Podrías ayudarme?'), and reporting what someone said they would do.",
    examples: ["Yo viajaría si tuviera dinero.", "¿Podrías ayudarme con esto?", "Ella dijo que vendría más tarde."],
    practice: [
      { prompt: "Yo ___ (viajar) si tuviera dinero.", answer: "viajaría" },
      { prompt: "Nosotros ___ (comer) allí si pudiéramos.", answer: "comeríamos" },
      { prompt: "Ella ___ (tener) más tiempo si no trabajara tanto.", answer: "tendría" },
      { prompt: "¿___ (tú / poder) ayudarme?", answer: "Podrías" },
      { prompt: "Nosotros ___ (decir) la verdad en esa situación.", answer: "diríamos" },
      { prompt: "Yo ___ (querer) más información antes de decidir.", answer: "querría" },
      { prompt: "¿___ (usted / poder) repetir la pregunta?", answer: "Podría" },
      { prompt: "Ellos ___ (hacer) lo mismo en tu lugar.", answer: "harían" },
      { prompt: "Tú ___ (venir) si te invitara, ¿verdad?", answer: "vendrías" },
      { prompt: "Tú ___ (saber) qué hacer en esa situación.", answer: "sabrías" },
    ],
  }],
};

// ------------------------------------------------------------
// VOCABULARY — flashcard categories, separate from the grammar
// skills above. Each word: {es, en}. Extend freely — add a new
// category object here to have it appear in the Vocabulary tab.
// ------------------------------------------------------------
const VOCAB_CATEGORIES = [
  { id: "fruits", label: "Fruits / Frutas", words: [
    { es: "la manzana", en: "apple" }, { es: "el plátano", en: "banana" }, { es: "la naranja", en: "orange" },
    { es: "la fresa", en: "strawberry" }, { es: "la uva", en: "grape" }, { es: "la piña", en: "pineapple" },
    { es: "la sandía", en: "watermelon" }, { es: "el limón", en: "lemon" }, { es: "la pera", en: "pear" },
    { es: "el melocotón", en: "peach" }, { es: "la cereza", en: "cherry" }, { es: "el mango", en: "mango" },
  ]},
  { id: "clothing", label: "Clothing / Ropa", words: [
    { es: "la camisa", en: "shirt" }, { es: "los pantalones", en: "pants" }, { es: "el vestido", en: "dress" },
    { es: "la falda", en: "skirt" }, { es: "los zapatos", en: "shoes" }, { es: "la chaqueta", en: "jacket" },
    { es: "el abrigo", en: "coat" }, { es: "la corbata", en: "tie" }, { es: "el sombrero", en: "hat" },
    { es: "los calcetines", en: "socks" }, { es: "el cinturón", en: "belt" }, { es: "la bufanda", en: "scarf" },
  ]},
  { id: "family", label: "Family / Familia", words: [
    { es: "la madre", en: "mother" }, { es: "el padre", en: "father" }, { es: "el hermano", en: "brother" },
    { es: "la hermana", en: "sister" }, { es: "el abuelo", en: "grandfather" }, { es: "la abuela", en: "grandmother" },
    { es: "el tío", en: "uncle" }, { es: "la tía", en: "aunt" }, { es: "el primo", en: "cousin (male)" },
    { es: "la prima", en: "cousin (female)" }, { es: "el esposo", en: "husband" }, { es: "la esposa", en: "wife" },
  ]},
  { id: "house", label: "House & Rooms / Casa y Cuartos", words: [
    { es: "la cocina", en: "kitchen" }, { es: "el dormitorio", en: "bedroom" }, { es: "el baño", en: "bathroom" },
    { es: "la sala", en: "living room" }, { es: "el jardín", en: "garden/yard" }, { es: "la puerta", en: "door" },
    { es: "la ventana", en: "window" }, { es: "el techo", en: "roof/ceiling" }, { es: "la escalera", en: "stairs" },
    { es: "el garaje", en: "garage" }, { es: "el comedor", en: "dining room" }, { es: "el sótano", en: "basement" },
  ]},
  { id: "colors_numbers", label: "Colors & Numbers / Colores y Números", words: [
    { es: "rojo", en: "red" }, { es: "azul", en: "blue" }, { es: "verde", en: "green" },
    { es: "amarillo", en: "yellow" }, { es: "negro", en: "black" }, { es: "blanco", en: "white" },
    { es: "morado", en: "purple" }, { es: "anaranjado", en: "orange (color)" }, { es: "diez", en: "ten" },
    { es: "veinte", en: "twenty" }, { es: "cien", en: "one hundred" }, { es: "mil", en: "one thousand" },
  ]},
  { id: "daily_routine", label: "Daily Routine / Rutina Diaria", words: [
    { es: "despertarse", en: "to wake up" }, { es: "levantarse", en: "to get up" }, { es: "ducharse", en: "to shower" },
    { es: "desayunar", en: "to have breakfast" }, { es: "vestirse", en: "to get dressed" }, { es: "trabajar", en: "to work" },
    { es: "almorzar", en: "to have lunch" }, { es: "cenar", en: "to have dinner" }, { es: "acostarse", en: "to go to bed" },
    { es: "descansar", en: "to rest" }, { es: "limpiar", en: "to clean" }, { es: "cocinar", en: "to cook" },
  ]},
  { id: "food_dining", label: "Food & Dining / Comida y Restaurante", words: [
    { es: "el desayuno", en: "breakfast" }, { es: "el almuerzo", en: "lunch" }, { es: "la cena", en: "dinner" },
    { es: "el menú", en: "menu" }, { es: "la cuenta", en: "the bill/check" }, { es: "el mesero / la mesera", en: "waiter/waitress" },
    { es: "la propina", en: "tip" }, { es: "el plato", en: "dish/plate" }, { es: "la bebida", en: "drink" },
    { es: "el postre", en: "dessert" }, { es: "tener hambre", en: "to be hungry" }, { es: "tener sed", en: "to be thirsty" },
  ]},
  { id: "travel", label: "Travel / Viajes", words: [
    { es: "el aeropuerto", en: "airport" }, { es: "el boleto", en: "ticket" }, { es: "la maleta", en: "suitcase" },
    { es: "el pasaporte", en: "passport" }, { es: "la aduana", en: "customs" }, { es: "el vuelo", en: "flight" },
    { es: "la llegada", en: "arrival" }, { es: "la salida", en: "departure/exit" }, { es: "el hotel", en: "hotel" },
    { es: "la reserva", en: "reservation" }, { es: "hacer las maletas", en: "to pack" }, { es: "perder el vuelo", en: "to miss the flight" },
  ]},
  { id: "emotions", label: "Emotions / Emociones", words: [
    { es: "feliz", en: "happy" }, { es: "triste", en: "sad" }, { es: "enojado", en: "angry" },
    { es: "nervioso", en: "nervous" }, { es: "emocionado", en: "excited" }, { es: "preocupado", en: "worried" },
    { es: "sorprendido", en: "surprised" }, { es: "tranquilo", en: "calm" }, { es: "orgulloso", en: "proud" },
    { es: "celoso", en: "jealous" }, { es: "avergonzado", en: "embarrassed" }, { es: "agradecido", en: "grateful" },
  ]},
  { id: "idioms", label: "Idiomatic Expressions / Modismos", words: [
    { es: "costar un ojo de la cara", en: "to cost an arm and a leg" }, { es: "estar en las nubes", en: "to have your head in the clouds" },
    { es: "tomar el pelo", en: "to pull someone's leg / tease" }, { es: "no tener pelos en la lengua", en: "to not mince words" },
    { es: "ser pan comido", en: "to be a piece of cake (very easy)" }, { es: "meter la pata", en: "to put your foot in it / mess up" },
    { es: "echar de menos", en: "to miss (someone/something)" }, { es: "dar en el clavo", en: "to hit the nail on the head" },
    { es: "estar como una cabra", en: "to be a bit crazy" }, { es: "ponerse las pilas", en: "to get your act together" },
    { es: "no dar pie con bola", en: "to not get anything right" }, { es: "tener mala pata", en: "to have bad luck" },
  ]},
];


const REFERENCE = [
  { skill:"ser_estar", q:"Why does 'estar' exist if 'ser' already means 'to be'?",
    a:"Spanish splits 'to be' into two verbs because it distinguishes what something fundamentally IS (ser) from the state it's currently IN (estar). English collapses both into one verb and relies on context — Spanish makes the distinction explicit. That's also why the same adjective can mean two different things depending on which verb you pair it with: 'ser aburrido' (to be a boring person) vs. 'estar aburrido' (to be bored right now)." },
  { skill:"pret_vs_imp", q:"Why are there two past tenses instead of one?",
    a:"English uses context and extra words ('I was walking' vs 'I walked') to show whether a past action was ongoing or finished. Spanish builds that distinction into the verb ending itself. Preterite = a completed, bounded event. Imperfect = an ongoing state, habit, or backdrop with no defined edges. Neither is 'more correct' — they encode different information." },
  { skill:"subjunctive", q:"What actually triggers the subjunctive?",
    a:"The subjunctive shows up in a dependent clause (after 'que') when the main clause expresses a wish, doubt, emotion, necessity, or something not-yet-real — and the subject changes between the two clauses. If there's no subject change, Spanish usually drops 'que' and uses the infinitive instead: 'Quiero salir' (no subjunctive) vs 'Quiero que salgas' (subjunctive, different subjects)." },
  { skill:"por_para", q:"Is there a real rule for por vs para, or is it memorization?",
    a:"There's a real underlying logic: para is forward-looking — it points toward a goal, purpose, recipient, or destination. Por looks backward or sideways — the cause behind something, an exchange, a duration, or movement through a space. Once you frame it as 'para = toward' and 'por = because of / through', most sentences sort themselves." },
  { skill:"object_pron", q:"Why does 'le' turn into 'se' sometimes?",
    a:"Spanish doesn't allow two pronouns starting with l- to sit next to each other (le lo, le la, les los, etc. sound and look awkward and historically caused confusion). So whenever an indirect object pronoun (le/les) is immediately followed by a direct object pronoun (lo/la/los/las), the indirect one automatically shifts to 'se'. It's a phonetic/historical fix, not a meaning change." },
  { skill:"gustar", q:"Why is the sentence structure for 'gustar' backwards from English?",
    a:"It's not backwards in Spanish's own logic — English is the outlier here. 'Gustar' literally means 'to be pleasing to', so the thing doing the pleasing is the grammatical subject, and the person is just the (indirect object) receiver of that pleasure. 'Me gusta el café' = 'coffee is pleasing to me.' A handful of other verbs (encantar, interesar, molestar, faltar) work the same way." },
  { skill:"adj_agreement", q:"Why do some adjectives shorten before the noun (like grande → gran)?",
    a:"A small set of common adjectives (grande, bueno, malo, primero, tercero, alguno, ninguno) drop their final vowel/syllable when placed directly before a singular noun — a holdover sound-smoothing pattern from Old Spanish. Grande is the trickiest because it also changes meaning: 'un gran hombre' (a great man) vs 'un hombre grande' (a big/tall man)." },
  { skill:"present", q:"Why do verbs like 'pedir' change their stem (e→i) but others like 'hablar' don't?",
    a:"Stem-changing verbs (o→ue, e→ie, e→i) shifted their vowel sound historically when stressed in speech, and that shift got locked into the spelling for the forms where the stress lands on the stem — everywhere except nosotros/vosotros, which is why those two forms look regular while the rest look 'irregular'." },
  { skill:"commands", q:"Why do negative tú commands use a different form than affirmative ones?",
    a:"Affirmative tú commands historically borrowed the él/ella present-tense form (habla, come) as a shortcut. Negative commands, though, use the present subjunctive — the same 'not-yet-real / directive' mood used elsewhere for wishes and doubts. That's why 'Habla' (do speak) and 'No hables' (don't speak) look like they're built differently: they genuinely come from two different grammatical sources." },
  { skill:"future", q:"Why do verbs like 'tener' and 'hacer' use a different stem in the future tense?",
    a:"The future tense actually formed historically from the infinitive plus a conjugated form of 'haber' (hablar-he → hablaré), which fused into one word over centuries. A handful of very common verbs had their infinitive stem worn down or contracted in everyday speech before the endings attached — tener→tendr-, hacer→har-, decir→dir- — and those contracted forms are what stuck. The endings themselves never change; only the stem for these dozen verbs is irregular." },
  { skill:"conditional", q:"Why does the conditional use the same irregular stems as the future?",
    a:"Both tenses attach their endings to the same base — for regular verbs that's the full infinitive, and for the same dozen irregular verbs it's the same contracted stem (tendr-, har-, podr-, etc.). Future and conditional differ only in which endings they add onto that shared stem: future uses -é/-ás/-á/-emos/-án, conditional uses -ía/-ías/-ía/-íamos/-ían. Learn the irregular stems once and they cover both tenses." },
];

// Flat search index combining reference + lesson explanations,
// used by the built-in "Ask why" search when no live AI key
// is configured.
function searchReference(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const hits = [];
  REFERENCE.forEach(r => {
    const hay = (r.q + " " + r.a + " " + r.skill).toLowerCase();
    if (hay.includes(q)) hits.push({ type: "reference", skill: r.skill, title: r.q, body: r.a });
  });
  Object.entries(LESSONS).forEach(([skillId, lessons]) => {
    lessons.forEach(l => {
      const hay = (l.title + " " + l.explain + " " + skillId).toLowerCase();
      if (hay.includes(q)) hits.push({ type: "lesson", skill: skillId, title: l.title, body: l.explain });
    });
  });
  return hits;
}
