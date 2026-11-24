/* Modelos de examen · Français A1. Formato del examen trimestral (Sistema de evaluación, foro del aula):
   2 heures · grammaire et lexique, compréhension orale, compréhension écrite, production écrite (la prueba oral es aparte, en la última clase).
   El estilo de los ejercicios copia el Partiel 2 (note sur 20). El reparto de puntos es orientativo. */
(function () {
const G = (items) => '<ol>' + items.map(t => `<li>${t}</li>`).join('') + '</ol>';
const S = (items) => '<ol>' + items.map(t => `<li>${t}</li>`).join('') + '</ol>';
const B = '..................';
const VF = (items) => '<ol>' + items.map(t => `<li>${t} &nbsp; ☐ Vrai ☐ Faux<br>Justification : ${B}${B}</li>`).join('') + '</ol>';
const VFo = (items) => '<ol>' + items.map(t => `<li>${t} &nbsp; ☐ Vrai ☐ Faux</li>`).join('') + '</ol>';
const PROD = (task) => ({ n: 'Exercice 9 · Production écrite', p: 4, q: task + '<br><i>Critères : réalisation de la tâche (tous les points), vocabulaire, grammaire et conjugaison, organisation (salutation, formule finale).</i>', l: 12 });

window.EXAMENES = window.EXAMENES || {};
window.EXAMENES.francais = {
  nombre: 'Français A1', emoji: '🇫🇷', color: 'var(--c-fra)', lang: 'fr',
  fecha: 'Miércoles 9 de diciembre · 12:00–14:00', grado: 'Lengua y cultura en francés I · Groupe 3', curso: 'Examen trimestriel · Trimestre 1',
  titulo: 'Français A1 · Examen trimestriel',
  formato: ['Grammaire et lexique', 'Compréhension orale (audio, dos escuchas)', 'Compréhension écrite', 'Production écrite: correo de 60–80 palabras', 'Vale el 60 % del trimestre; la prueba oral es aparte'],
  estimado: 'Reparto de puntos orientativo (sobre 20, como el parcial)',
  instrucciones: [
    '<b>Durée :</b> 2 heures · <b>Note sur 20</b>. Répondez directement sur la feuille.',
    'Partie I – Grammaire et lexique (8 points) · Partie II – Compréhension orale (4 points) · Partie III – Compréhension écrite (4 points) · Partie IV – Production écrite (4 points).',
    'Compréhension orale : vous entendez l’enregistrement deux fois. Lisez les questions avant la première écoute.'
  ],
  modelos: [
  /* ================= MODÈLE 1 · au travail à l'étranger ================= */
  { tema: 'Stage à l’étranger', secciones: [
    { h: 'Partie I – Grammaire et lexique (8 points)', qs: [
      { n: 'Exercice 1. Conjuguez les verbes au présent.', p: 2, q: G([`Nous ${B} (être) étudiants à Barcelone.`, `Vous ${B} (faire) du sport le week-end ?`, `Mes amis ${B} (aller) au cinéma ce soir.`, `Tu ${B} (avoir) quel âge ?`, `J’${B} (écouter) la radio le matin.`, `Elles ${B} (travailler) chez Renault.`, `Nous ${B} (voyager) souvent en train.`, `Il ${B} (préférer) le café.`]) + '<i>0,25 par réponse</i>',
        s: S(['sommes', 'faites', 'vont', 'as', 'écoute', 'travaillent', 'voyageons (on garde le e)', 'préfère']) },
      { n: 'Exercice 2. Mettez les phrases à la forme négative.', p: 1, q: G(['Je travaille le samedi.', 'Elle aime le thé.', 'Il voyage toujours en avion.', 'Nous mangeons tout.']),
        s: S(['Je ne travaille pas le samedi.', 'Elle n’aime pas le thé.', 'Il ne voyage jamais en avion. (toujours → jamais)', 'Nous ne mangeons rien. (tout → rien)']) },
      { n: 'Exercice 3. Complétez avec À, AU, EN ou AUX.', p: 1.5, q: G([`Je travaille ${B} Lyon.`, `Ma sœur habite ${B} Canada.`, `Nous allons ${B} Italie.`, `Il fait un stage ${B} États-Unis.`, `Elles vivent ${B} Portugal.`, `Tu pars ${B} Allemagne ?`]),
        s: S(['à (ville)', 'au (pays masculin)', 'en (pays féminin)', 'aux (pluriel)', 'au', 'en (commence par une voyelle)']) },
      { n: 'Exercice 4. Complétez avec un adjectif possessif.', p: 1.5, q: G([`Je vous présente ${B} mère.`, `Elle cherche ${B} passeport.`, `Nous aimons beaucoup ${B} professeur.`, `Tu as ${B} adresse électronique ?`, `Ils visitent Paris avec ${B} enfants.`, `Madame, voici ${B} clés.`]),
        s: S(['ma', 'son', 'notre', 'ton (féminin + voyelle → ton)', 'leurs', 'vos']) },
      { n: 'Exercice 5. Complétez avec IL FAIT ou IL Y A.', p: 1, q: G([`${B} froid à Moscou.`, `${B} du vent sur la plage.`, `${B} 25 degrés.`, `${B} des nuages.`]),
        s: S(['Il fait (adjectif)', 'Il y a (du + nom)', 'Il fait (température)', 'Il y a (des + nom)']) },
      { n: 'Exercice 6. Écrivez le féminin.', p: 1, q: G([`un directeur → une ${B}`, `un vendeur → une ${B}`, `un infirmier → une ${B}`, `il est italien → elle est ${B}`]),
        s: S(['directrice', 'vendeuse', 'infirmière', 'italienne']) }
    ]},
    { h: 'Partie II – Compréhension orale (4 points)', qs: [
      { n: 'Exercice 7. Écoutez le dialogue à la réception d’un hôtel.', p: 4,
        audio: 'Bonjour madame, je m’appelle Marc Dupont. Je suis français, j’habite à Lyon. Je suis ingénieur chez Airbus. — Enchantée, monsieur. Vous êtes en vacances à Barcelone ? — Non, je suis ici pour le travail. Je reste cinq jours. — Il fait beau aujourd’hui ! — Oui, il fait vingt-deux degrés. J’adore Barcelone, mais je n’aime pas les transports : il y a trop de monde. — Vous avez une adresse électronique ? — Oui : marc point dupont, arobase, gmail point com.',
        q: 'A. Vrai ou faux ? (0,5 par réponse)' + VFo(['Marc est espagnol.', 'Il est ingénieur.', 'Il est en vacances.', 'Il reste cinq jours à Barcelone.']) + 'B. Répondez. (1 point par réponse)<ol start="5"><li>Quel temps fait-il ?</li><li>Qu’est-ce que Marc n’aime pas à Barcelone ?</li></ol>', l: 3,
        s: 'A. 1 Faux (il est français) · 2 Vrai · 3 Faux (il est là pour le travail) · 4 Vrai.<br>B. 5 Il fait beau, il fait 22 degrés. · 6 Les transports : il y a trop de monde.<br><i>Transcription : « Bonjour madame, je m’appelle Marc Dupont. Je suis français… »</i>' }
    ]},
    { h: 'Partie III – Compréhension écrite (4 points)', qs: [
      { n: 'Exercice 8. Lisez le message de Sofia.', p: 4,
        ctx: 'Salut Paul !<br>Je suis à Genève, en Suisse, pour un stage de trois mois dans une banque. Je travaille du lundi au vendredi. Ma collègue s’appelle Anna, elle est allemande et elle est très sympathique. Le soir, je fais souvent du sport et le week-end, je visite la ville. Il fait froid et il y a de la neige, mais j’adore la montagne ! Je n’aime pas les restaurants : ils sont très chers.<br>Et toi, comment ça va ?<br>Bises, Sofia',
        q: 'A. Vrai ou faux ? Justifiez avec une phrase du texte. (0,5 par réponse)' + VF(['Sofia est en vacances.', 'Anna est allemande.', 'Il fait chaud à Genève.', 'Sofia aime les restaurants.']) + `B. Complétez la fiche. (0,25 par réponse) Ville et pays : ${B} · Durée du stage : ${B} · Lieu de travail : ${B} · Activité du soir : ${B}<br>C. Que fait Sofia le week-end ? Répondez par une phrase qui commence par « Elle… ». (1 point)`, l: 2,
        s: 'A. 1 Faux : « pour un stage de trois mois » · 2 Vrai : « elle est allemande » · 3 Faux : « Il fait froid » · 4 Faux : « Je n’aime pas les restaurants ».<br>B. Genève, Suisse · trois mois · une banque · le sport.<br>C. Elle visite la ville.' }
    ]},
    { h: 'Partie IV – Production écrite (4 points)', qs: [
      Object.assign(PROD('Vous faites un stage dans une entreprise à l’étranger. Écrivez un courriel à un(e) ami(e) francophone (60 à 80 mots). Dites où vous êtes (ville et pays) et dans quelle entreprise ; décrivez le temps qu’il fait ; parlez de vos activités et de leur fréquence ; dites ce que vous aimez et ce que vous n’aimez pas ; présentez un(e) collègue (prénom, nationalité, profession).'),
        { s: 'Exemple (≈ 75 mots) : « Salut Emma ! Je suis à Lyon, en France, et je fais un stage chez Danone. Il fait froid et il y a du vent. Je travaille du lundi au vendredi et je vais souvent au cinéma le soir. J’adore la cuisine française, mais je n’aime pas le métro. Mon collègue s’appelle Hugo, il est belge et il est informaticien. Il est très sympathique ! Et toi, ça va ? Bises, Martí » — Vérifiez : à + ville, en + pays, il fait / il y a, adverbes de fréquence, j’adore / je n’aime pas, nationalité et profession au bon genre.' })
    ]}
  ]},
  /* ================= MODÈLE 2 · la famille ================= */
  { tema: 'La famille', secciones: [
    { h: 'Partie I – Grammaire et lexique (8 points)', qs: [
      { n: 'Exercice 1. Conjuguez les verbes au présent.', p: 2, q: G([`J’${B} (avoir) deux frères.`, `Vous ${B} (aller) bien ?`, `Ils ${B} (faire) les courses le samedi.`, `Tu ${B} (être) marié ?`, `Nous ${B} (écouter) le professeur.`, `Elle ${B} (habiter) à Nice.`, `Vous ${B} (être) de quelle nationalité ?`, `Mes parents ${B} (avoir) une maison à la campagne.`]),
        s: S(['ai', 'allez', 'font', 'es', 'écoutons', 'habite', 'êtes', 'ont']) },
      { n: 'Exercice 2. Mettez les phrases à la forme négative.', p: 1, q: G(['J’ai un frère.', 'Nous allons au cinéma.', 'Elle écoute toujours la radio.', 'Il comprend tout.']),
        s: S(['Je n’ai pas de frère. (un → de)', 'Nous n’allons pas au cinéma.', 'Elle n’écoute jamais la radio.', 'Il ne comprend rien.']) },
      { n: 'Exercice 3. Complétez avec À, AU, EN ou AUX.', p: 1.5, q: G([`Mon oncle vit ${B} Mexique.`, `Nous passons l’été ${B} Grèce.`, `Elle étudie ${B} Londres.`, `Ils travaillent ${B} Pays-Bas.`, `Je vais ${B} Japon en avril.`, `Vous habitez ${B} Espagne ?`]),
        s: S(['au (le Mexique est masculin)', 'en', 'à', 'aux', 'au', 'en']) },
      { n: 'Exercice 4. Complétez avec un adjectif possessif.', p: 1.5, q: G([`Je vous présente ${B} sœur, Julie.`, `Paul et Marie habitent avec ${B} grand-mère.`, `J’invite ${B} amie Léa à dîner.`, `Il oublie toujours ${B} lunettes.`, `Monsieur, vous avez ${B} carte d’identité ?`, `Nous cherchons ${B} valises.`]),
        s: S(['ma', 'leur', 'mon (féminin + voyelle)', 'ses', 'votre', 'nos']) },
      { n: 'Exercice 5. Complétez avec QUEL, QUELLE, QUELS ou QUELLES.', p: 1, q: G([`${B} est votre nom ?`, `${B} est votre profession ?`, `${B} langues parlez-vous ?`, `${B} sports aimes-tu ?`]),
        s: S(['Quel', 'Quelle', 'Quelles', 'Quels']) },
      { n: 'Exercice 6. Écrivez les nombres en lettres.', p: 1, q: G(['21 : ' + B, '34 : ' + B, '47 : ' + B, '16 : ' + B]),
        s: S(['vingt et un', 'trente-quatre', 'quarante-sept', 'seize']) }
    ]},
    { h: 'Partie II – Compréhension orale (4 points)', qs: [
      { n: 'Exercice 7. Écoutez Hugo qui présente sa famille.', p: 4,
        audio: 'Salut Léa ! Je te présente ma famille. Voici mon père, il s’appelle Jean, il a cinquante-deux ans et il est médecin. Ma mère s’appelle Claire, elle est professeure. J’ai une sœur, Emma. Elle a dix-neuf ans et elle étudie à Toulouse. — Tu as des frères ? — Non, je n’ai pas de frère. — Et tes grands-parents ? — Ils sont à la retraite. Ils habitent en Bretagne.',
        q: 'A. Vrai ou faux ? (0,5 par réponse)' + VFo(['Le père d’Hugo est médecin.', 'Sa mère est infirmière.', 'Emma a dix-neuf ans.', 'Hugo a un frère.']) + 'B. Répondez. (1 point par réponse)<ol start="5"><li>Où étudie Emma ?</li><li>Où habitent les grands-parents d’Hugo ?</li></ol>', l: 3,
        s: 'A. 1 Vrai · 2 Faux (elle est professeure) · 3 Vrai · 4 Faux (il n’a pas de frère).<br>B. 5 À Toulouse. · 6 En Bretagne (ils sont à la retraite).' }
    ]},
    { h: 'Partie III – Compréhension écrite (4 points)', qs: [
      { n: 'Exercice 8. Lisez la présentation de Karim.', p: 4,
        ctx: 'Bonjour ! Je m’appelle Karim, j’ai vingt-trois ans et je suis marocain. J’habite à Paris avec ma femme, Inès. Elle est infirmière à l’hôpital Saint-Louis. Moi, je suis vendeur dans un magasin de vêtements. Nous n’avons pas d’enfants, mais nous avons un chat ! Le dimanche, nous allons souvent chez mes beaux-parents, à Versailles. J’adore la cuisine de ma belle-mère. Je ne regarde jamais la télévision : je préfère lire.',
        q: 'A. Vrai ou faux ? Justifiez avec une phrase du texte. (0,5 par réponse)' + VF(['Karim est français.', 'Inès travaille dans un hôpital.', 'Ils ont deux enfants.', 'Karim aime regarder la télévision.']) + `B. Complétez la fiche. (0,25 par réponse) Âge : ${B} · Profession de Karim : ${B} · Ville : ${B} · Animal : ${B}<br>C. Que font Karim et Inès le dimanche ? Répondez par une phrase qui commence par « Ils… ». (1 point)`, l: 2,
        s: 'A. 1 Faux : « je suis marocain » · 2 Vrai : « Elle est infirmière à l’hôpital Saint-Louis » · 3 Faux : « Nous n’avons pas d’enfants » · 4 Faux : « Je ne regarde jamais la télévision ».<br>B. 23 ans · vendeur · Paris · un chat.<br>C. Ils vont souvent chez les beaux-parents de Karim, à Versailles.' }
    ]},
    { h: 'Partie IV – Production écrite (4 points)', qs: [
      Object.assign(PROD('Vous écrivez à un(e) correspondant(e) francophone pour vous présenter (60 à 80 mots). Donnez votre nom, votre âge, votre nationalité et votre ville ; présentez deux membres de votre famille (prénom, âge, profession) ; parlez de vos goûts et de leur fréquence ; posez-lui une question.'),
        { s: 'Exemple : « Bonjour Camille ! Je m’appelle Martí, j’ai dix-huit ans, je suis espagnol et j’habite à Barcelone. Mon père s’appelle Jordi, il a cinquante ans et il est architecte. Ma sœur s’appelle Laia, elle a quinze ans et elle est lycéenne. J’adore le football et je joue souvent avec mes amis. Je n’aime pas le café. Le week-end, je vais rarement au cinéma. Et toi, tu as des frères et sœurs ? À bientôt ! » — Vérifiez : mon père / ma sœur, il a … ans (avoir), profession sans article, fréquence.' })
    ]}
  ]},
  /* ================= MODÈLE 3 · voyage et météo ================= */
  { tema: 'Voyage et météo', secciones: [
    { h: 'Partie I – Grammaire et lexique (8 points)', qs: [
      { n: 'Exercice 1. Conjuguez les verbes au présent.', p: 2, q: G([`Nous ${B} (aller) à Rome en avion.`, `Aujourd’hui, il ${B} (faire) très chaud.`, `Vous ${B} (avoir) votre passeport ?`, `Je ${B} (être) dans le train.`, `Elles ${B} (regarder) un film.`, `Tu ${B} (manger) un sandwich ?`, `Nous ${B} (manger) au restaurant.`, `Ils ${B} (être) en retard.`]),
        s: S(['allons', 'fait', 'avez', 'suis', 'regardent', 'manges', 'mangeons (on garde le e)', 'sont']) },
      { n: 'Exercice 2. Mettez les phrases à la forme négative.', p: 1, q: G(['Il y a du vent.', 'Elle a une valise.', 'Nous voyageons toujours en première classe.', 'Tu achètes tout.']),
        s: S(['Il n’y a pas de vent. (du → de)', 'Elle n’a pas de valise.', 'Nous ne voyageons jamais en première classe.', 'Tu n’achètes rien.']) },
      { n: 'Exercice 3. Complétez avec À, AU, EN, AUX, DANS ou CHEZ.', p: 1.5, q: G([`Je suis ${B} Madrid.`, `Elle travaille ${B} Danone.`, `Il habite ${B} Brésil.`, `Nous allons ${B} Inde.`, `Mon bureau est ${B} une grande tour.`, `Ils partent ${B} États-Unis.`]),
        s: S(['à', 'chez (entreprise)', 'au', 'en', 'dans', 'aux']) },
      { n: 'Exercice 4. Traduisez en français avec l’article.', p: 1.5, q: G(['almohada : ' + B, 'manta : ' + B, 'auriculares : ' + B, 'maleta : ' + B, 'cartera : ' + B, 'tenedor : ' + B]),
        s: S(['un oreiller', 'une couverture', 'des écouteurs', 'une valise', 'un portefeuille', 'une fourchette']) },
      { n: 'Exercice 5. Complétez avec IL FAIT ou IL Y A.', p: 1, q: G([`${B} du soleil.`, `${B} beau.`, `${B} des nuages.`, `${B} 10 degrés.`]),
        s: S(['Il y a', 'Il fait', 'Il y a', 'Il fait']) },
      { n: 'Exercice 6. Complétez avec un pronom tonique.', p: 1, q: G([`${B}, je suis espagnol.`, `${B}, il est canadien.`, `${B}, nous sommes étudiants.`, `${B}, ils sont japonais.`]),
        s: S(['Moi', 'Lui', 'Nous', 'Eux']) }
    ]},
    { h: 'Partie II – Compréhension orale (4 points)', qs: [
      { n: 'Exercice 7. Écoutez l’annonce dans l’avion.', p: 4,
        audio: 'Mesdames et messieurs, bienvenue à bord du vol AF 1149 à destination de Paris. Le vol dure deux heures. À Paris, il fait douze degrés et il y a des nuages. Nous vous proposons un sandwich, un café, un jus d’orange ou un verre d’eau. Si vous avez froid, demandez une couverture. Les écouteurs sont dans la pochette devant vous. Bon voyage !',
        q: 'A. Vrai ou faux ? (0,5 par réponse)' + VFo(['L’avion va à Paris.', 'Le vol dure trois heures.', 'À Paris, il fait beau.', 'Les écouteurs sont devant les passagers.']) + 'B. Répondez. (1 point par réponse)<ol start="5"><li>Quelle température fait-il à Paris ?</li><li>Qu’est-ce qu’on peut demander si on a froid ?</li></ol>', l: 3,
        s: 'A. 1 Vrai · 2 Faux (deux heures) · 3 Faux (il y a des nuages) · 4 Vrai.<br>B. 5 Il fait 12 degrés. · 6 Une couverture.' }
    ]},
    { h: 'Partie III – Compréhension écrite (4 points)', qs: [
      { n: 'Exercice 8. Lisez la carte postale de Lucie.', p: 4,
        ctx: 'Chère Maman,<br>Je suis à Montréal, au Canada, avec mon amie Chloé. Nous restons une semaine. Il fait très froid : moins dix degrés ! Il y a de la neige partout. Le matin, nous visitons la ville et l’après-midi, nous allons au musée. Le soir, nous mangeons dans des restaurants québécois : j’adore la poutine ! Chloé n’aime pas le froid, elle préfère l’été. Samedi, nous allons à Québec en bus.<br>Gros bisous, Lucie',
        q: 'A. Vrai ou faux ? Justifiez avec une phrase du texte. (0,5 par réponse)' + VF(['Lucie est au Canada.', 'Il fait chaud à Montréal.', 'Chloé adore l’hiver.', 'Elles visitent la ville le soir.']) + `B. Complétez la fiche. (0,25 par réponse) Ville et pays : ${B} · Durée du voyage : ${B} · Activité de l’après-midi : ${B} · Samedi (destination et transport) : ${B}<br>C. Que mange Lucie le soir ? Répondez par une phrase qui commence par « Elle… ». (1 point)`, l: 2,
        s: 'A. 1 Vrai : « Je suis à Montréal, au Canada » · 2 Faux : « moins dix degrés » · 3 Faux : « Chloé n’aime pas le froid » · 4 Faux : « Le matin, nous visitons la ville ».<br>B. Montréal, Canada · une semaine · le musée · Québec, en bus.<br>C. Elle mange de la poutine dans des restaurants québécois.' }
    ]},
    { h: 'Partie IV – Production écrite (4 points)', qs: [
      Object.assign(PROD('Vous êtes en vacances. Écrivez un courriel à un(e) ami(e) francophone (60 à 80 mots). Dites où vous êtes (ville et pays) et avec qui ; décrivez le temps qu’il fait ; racontez vos activités et leur fréquence ; dites ce que vous aimez et ce que vous n’aimez pas ; posez-lui une question.'),
        { s: 'Exemple : « Salut Paul ! Je suis à Lisbonne, au Portugal, avec ma cousine Ana. Il fait beau et il y a du soleil : il fait vingt-cinq degrés ! Le matin, nous visitons toujours la ville et l’après-midi, nous allons souvent à la plage. J’adore la cuisine portugaise, mais je n’aime pas les touristes ! Le soir, nous mangeons au restaurant. Et toi, quel temps fait-il à Paris ? Bises, Martí » (≈ 70 mots).' })
    ]}
  ]},
  /* ================= MODÈLE 4 · le travail ================= */
  { tema: 'Le travail', secciones: [
    { h: 'Partie I – Grammaire et lexique (8 points)', qs: [
      { n: 'Exercice 1. Conjuguez les verbes au présent.', p: 2, q: G([`Je ${B} (travailler) dans la finance.`, `Qu’est-ce que vous ${B} (faire) dans la vie ?`, `Elle ${B} (être) directrice commerciale.`, `Nous ${B} (avoir) une réunion à dix heures.`, `Ils ${B} (aller) au bureau en métro.`, `Tu ${B} (aimer) ton travail ?`, `Mes collègues ${B} (déjeuner) à midi.`, `Nous ${B} (préparer) la présentation.`]),
        s: S(['travaille', 'faites', 'est', 'avons', 'vont', 'aimes', 'déjeunent', 'préparons']) },
      { n: 'Exercice 2. Mettez les phrases à la forme négative.', p: 1, q: G(['Il est informaticien.', 'Nous travaillons le dimanche.', 'Elle arrive toujours en retard.', 'Je comprends tout.']),
        s: S(['Il n’est pas informaticien.', 'Nous ne travaillons pas le dimanche.', 'Elle n’arrive jamais en retard.', 'Je ne comprends rien.']) },
      { n: 'Exercice 3. Écrivez le féminin.', p: 1.5, q: G([`un serveur → une ${B}`, `un boulanger → une ${B}`, `un assistant → une ${B}`, `un informaticien → une ${B}`, `un directeur → une ${B}`, `un secrétaire → une ${B}`]),
        s: S(['serveuse', 'boulangère', 'assistante', 'informaticienne', 'directrice', 'secrétaire (ne change pas)']) },
      { n: 'Exercice 4. Complétez avec un adjectif possessif.', p: 1.5, q: G([`Je travaille avec ${B} collègue Marc.`, `Elle présente ${B} entreprise.`, `Nous aimons ${B} bureau.`, `Monsieur, vous avez ${B} badge ?`, `Ils parlent avec ${B} clients.`, `Tu prépares ${B} présentation ?`]),
        s: S(['mon', 'son (féminin + voyelle)', 'notre', 'votre', 'leurs', 'ta']) },
      { n: 'Exercice 5. Complétez avec QUEL, QUELLE, QUELS ou QUELLES.', p: 1, q: G([`${B} est votre entreprise ?`, `Dans ${B} secteur travaillez-vous ?`, `${B} sont vos horaires ?`, `${B} langues parlez-vous au travail ?`]),
        s: S(['Quelle', 'quel', 'Quels', 'Quelles']) },
      { n: 'Exercice 6. Complétez avec À, AU, EN ou CHEZ.', p: 1, q: G([`Il est ingénieur ${B} Airbus.`, `Elle travaille ${B} Toulouse.`, `Nous avons un bureau ${B} Chine.`, `L’entreprise a un magasin ${B} Portugal.`]),
        s: S(['chez', 'à', 'en', 'au']) }
    ]},
    { h: 'Partie II – Compréhension orale (4 points)', qs: [
      { n: 'Exercice 7. Écoutez la présentation au bureau.', p: 4,
        audio: 'Bonjour, je vous présente Sophie Martin. Elle est responsable marketing chez Nofisa. — Enchanté, Sophie. Vous travaillez à Paris ? — Non, je travaille à Lyon, mais je voyage souvent en Espagne et en Italie. — Vous aimez votre travail ? — Oui, j’adore mon travail, mais je n’aime pas les réunions trop longues ! — Et vous parlez espagnol ? — Oui, je parle espagnol et anglais.',
        q: 'A. Vrai ou faux ? (0,5 par réponse)' + VFo(['Sophie est directrice financière.', 'Elle travaille à Lyon.', 'Elle voyage souvent en Allemagne.', 'Elle parle espagnol.']) + 'B. Répondez. (1 point par réponse)<ol start="5"><li>Dans quelle entreprise travaille Sophie ?</li><li>Qu’est-ce qu’elle n’aime pas ?</li></ol>', l: 3,
        s: 'A. 1 Faux (responsable marketing) · 2 Vrai · 3 Faux (en Espagne et en Italie) · 4 Vrai.<br>B. 5 Chez Nofisa. · 6 Les réunions trop longues.' }
    ]},
    { h: 'Partie III – Compréhension écrite (4 points)', qs: [
      { n: 'Exercice 8. Lisez le profil de Thomas.', p: 4,
        ctx: 'Je m’appelle Thomas Bernard, j’ai trente ans et je suis belge. Je suis chef de projet dans une entreprise d’informatique à Bruxelles. Je travaille de huit heures et demie à dix-sept heures. Le matin, je réponds aux courriels et l’après-midi, je fais des réunions avec mon équipe. Je vais au bureau à vélo. J’aime beaucoup mon travail, mais je déteste les embouteillages. Le vendredi, je travaille à la maison.',
        q: 'A. Vrai ou faux ? Justifiez avec une phrase du texte. (0,5 par réponse)' + VF(['Thomas est français.', 'Il travaille dans l’informatique.', 'Il va au bureau en voiture.', 'Il travaille toujours au bureau.']) + `B. Complétez la fiche. (0,25 par réponse) Âge : ${B} · Profession : ${B} · Ville : ${B} · Horaires : ${B}<br>C. Que fait Thomas l’après-midi ? Répondez par une phrase qui commence par « Il… ». (1 point)`, l: 2,
        s: 'A. 1 Faux : « je suis belge » · 2 Vrai : « dans une entreprise d’informatique » · 3 Faux : « Je vais au bureau à vélo » · 4 Faux : « Le vendredi, je travaille à la maison ».<br>B. 30 ans · chef de projet · Bruxelles · de 8 h 30 à 17 h.<br>C. Il fait des réunions avec son équipe.' }
    ]},
    { h: 'Partie IV – Production écrite (4 points)', qs: [
      Object.assign(PROD('Vous faites un stage dans une entreprise française. Écrivez un courriel à un(e) ami(e) (60 à 80 mots). Dites dans quelle ville et dans quelle entreprise vous êtes ; parlez de vos horaires et de vos activités ; dites ce que vous aimez et ce que vous n’aimez pas ; présentez votre responsable (prénom, nationalité, fonction) ; décrivez le temps qu’il fait.'),
        { s: 'Exemple : « Bonjour Léa ! Je fais un stage à Toulouse, chez Airbus. Je travaille de neuf heures à dix-sept heures. Le matin, je prépare des documents et l’après-midi, j’ai souvent des réunions. J’adore mon équipe, mais je n’aime pas les horaires du vendredi. Ma responsable s’appelle Claire, elle est française et elle est directrice de la communication. Il fait beau et il fait vingt degrés. À bientôt ! Martí »' })
    ]}
  ]},
  /* ================= MODÈLE 5 · bénévolat et goûts ================= */
  { tema: 'Bénévolat et goûts', secciones: [
    { h: 'Partie I – Grammaire et lexique (8 points)', qs: [
      { n: 'Exercice 1. Conjuguez les verbes au présent.', p: 2, q: G([`Nous ${B} (être) bénévoles dans une association.`, `Je ${B} (aller) au marché le samedi.`, `Vous ${B} (faire) du sport ?`, `Elles ${B} (aimer) la musique.`, `Tu ${B} (avoir) faim ?`, `Il ${B} (jouer) au tennis.`, `Nous ${B} (partager) un appartement.`, `Mes amis ${B} (être) très sympathiques.`]),
        s: S(['sommes', 'vais', 'faites', 'aiment', 'as', 'joue', 'partageons (on garde le e)', 'sont']) },
      { n: 'Exercice 2. Répondez à la forme négative.', p: 1, q: G(['Tu aimes le football ? — Non, …', 'Vous avez un chien ? — Non, nous …', 'Il fait toujours du sport ? — Non, il …', 'Elle mange tout ? — Non, elle …']),
        s: S(['Non, je n’aime pas le football.', 'Non, nous n’avons pas de chien.', 'Non, il ne fait jamais de sport.', 'Non, elle ne mange rien.']) },
      { n: 'Exercice 3. Complétez avec À, AU, EN ou AUX.', p: 1.5, q: G([`L’association est ${B} Sénégal.`, `Je vais ${B} Dakar.`, `Elle est bénévole ${B} Colombie.`, `Nous partons ${B} Philippines.`, `Ils travaillent ${B} Maroc.`, `Tu restes ${B} France ?`]),
        s: S(['au', 'à', 'en', 'aux', 'au', 'en']) },
      { n: 'Exercice 4. Complétez avec un adjectif possessif.', p: 1.5, q: G([`Je fais ${B} devoirs.`, `Elle adore ${B} ville.`, `Ils aiment beaucoup ${B} association.`, `Vous connaissez ${B} voisins ?`, `Nous invitons ${B} amis.`, `Il cherche ${B} école.`]),
        s: S(['mes', 'sa', 'leur', 'vos', 'nos', 'son (féminin + voyelle)']) },
      { n: 'Exercice 5. Complétez avec IL FAIT ou IL Y A.', p: 1, q: G([`En été, ${B} très chaud.`, `Attention, ${B} du brouillard.`, `${B} mauvais aujourd’hui.`, `${B} des nuages et du vent.`]),
        s: S(['il fait', 'il y a', 'Il fait', 'Il y a']) },
      { n: 'Exercice 6. Classez du plus positif au plus négatif.', p: 1, q: 'a) détester · aimer bien · adorer · ne pas aimer → ' + B + B + '<br>b) toujours · jamais · souvent · rarement → ' + B + B,
        s: 'a) adorer → aimer bien → ne pas aimer → détester (0,5)<br>b) toujours → souvent → rarement → jamais (0,5)' }
    ]},
    { h: 'Partie II – Compréhension orale (4 points)', qs: [
      { n: 'Exercice 7. Écoutez le dialogue dans l’association.', p: 4,
        audio: 'Salut, tu es nouveau ? — Oui, je m’appelle Diego, je suis mexicain. Je suis bénévole ici, à l’association Solidarité Dakar. — Moi, c’est Aïcha. Je suis sénégalaise. Qu’est-ce que tu fais dans l’association ? — Je donne des cours d’espagnol aux enfants, trois fois par semaine. — Super ! Tu aimes Dakar ? — Oui, j’adore la ville et la musique, mais je n’aime pas la chaleur : il fait très chaud !',
        q: 'A. Vrai ou faux ? (0,5 par réponse)' + VFo(['Diego est espagnol.', 'Aïcha est sénégalaise.', 'Diego donne des cours de français.', 'Diego n’aime pas la chaleur.']) + 'B. Répondez. (1 point par réponse)<ol start="5"><li>Combien de fois par semaine Diego donne-t-il des cours ?</li><li>Qu’est-ce qu’il adore à Dakar ?</li></ol>', l: 3,
        s: 'A. 1 Faux (il est mexicain) · 2 Vrai · 3 Faux (des cours d’espagnol) · 4 Vrai.<br>B. 5 Trois fois par semaine. · 6 La ville et la musique.' }
    ]},
    { h: 'Partie III – Compréhension écrite (4 points)', qs: [
      { n: 'Exercice 8. Lisez le blog de Clara.', p: 4,
        ctx: 'Bonjour à tous ! Je m’appelle Clara, je suis italienne et j’ai vingt ans. Cette année, je suis bénévole dans une association écologique à Québec, au Canada. Je travaille avec Marc, un Canadien très drôle : il est responsable des activités. Nous nettoyons les parcs le mardi et le jeudi, et nous organisons des ateliers pour les enfants le mercredi. J’adore les gens d’ici, mais je déteste l’hiver : il fait moins quinze degrés ! Le week-end, je fais du ski ou je reste à la maison.',
        q: 'A. Vrai ou faux ? Justifiez avec une phrase du texte. (0,5 par réponse)' + VF(['Clara est canadienne.', 'Marc est responsable des activités.', 'Ils nettoient les parcs le lundi.', 'Clara adore l’hiver.']) + `B. Complétez la fiche. (0,25 par réponse) Ville et pays : ${B} · Type d’association : ${B} · Activité du mercredi : ${B} · Température : ${B}<br>C. Que fait Clara le week-end ? Répondez par une phrase qui commence par « Elle… ». (1 point)`, l: 2,
        s: 'A. 1 Faux : « je suis italienne » · 2 Vrai : « il est responsable des activités » · 3 Faux : « le mardi et le jeudi » · 4 Faux : « je déteste l’hiver ».<br>B. Québec, Canada · écologique · des ateliers pour les enfants · moins quinze degrés.<br>C. Elle fait du ski ou elle reste à la maison.' }
    ]},
    { h: 'Partie IV – Production écrite (4 points)', qs: [
      Object.assign(PROD('Vous participez à un programme de volontariat à l’étranger. Écrivez un courriel à un(e) ami(e) francophone (60 à 80 mots). Dites où vous êtes (ville et pays) et dans quelle association ; décrivez le temps qu’il fait ; parlez de vos activités et de leur fréquence ; dites ce que vous aimez et ce que vous n’aimez pas dans ce pays ; présentez un(e) autre bénévole (prénom, nationalité, rôle).'),
        { s: 'Exemple : « Salut Marie ! Je suis à Dakar, au Sénégal, et je suis bénévole dans l’association Solidarité Dakar. Il fait très chaud et il y a du soleil. Je donne des cours d’anglais trois fois par semaine et je joue souvent au football avec les enfants. J’adore la musique et les gens, mais je n’aime pas la chaleur. Mon amie Aïcha est sénégalaise, elle est responsable des activités. Bises ! Martí » (≈ 75 mots).' })
    ]}
  ]}
  ]
};
})();
