import { Context } from 'telegraf';
import { getLanguageFromCode } from '../utils/language-detector';

const WELCOME_MESSAGE_EN = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌾 *ជំនួយការកសិកម្មកម្ពុជា* 🌾
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*👋 សួស្តី! ខ្ញុំជានរណា?*

ខ្ញុំជាជំនួយការកសិកម្ម AI ប្រកបដោយវិជ្ជាជីវៈ ដែលត្រូវបានបង្កើតឡើងដោយ *Anachak Cyb3r* (អនាចក្រ Cyb3r) ដើម្បីជួយកសិករខ្មែរកែលម្អការដាំដុះ និងបង្កើនផលិតកម្មកសិកម្ម។

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🎯 ខ្ញុំអាចជួយអ្នកអំពី:*

🌱 ការដាំដុះដំណាំ (ស្រូវ បន្លែ ផ្លែឈើ)
🐛 ការគ្រប់គ្រងសត្វល្អិត និងជំងឺ
🌍 សុខភាពដី និងការបង្កកំណើត
💧 ការគ្រប់គ្រងទឹក និងធារាសាស្ត្រ
🌿 កសិកម្មធម្មជាតិ និងនិរន្តរភាព
📅 កាលវិភាគដាំដុះតាមរដូវកាល

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🌐 របៀបប្រើប្រាស់:*

វាយសំណួរជា *ភាសាខ្មែរ* → ទទួលចម្លើយជាខ្មែរ
វាយសំណួរជា *English* → ទទួលចម្លើយជាអង់គ្លេស

*✨ ស្វ័យប្រវត្តិ - មិនចាំបាច់ជ្រើសរើសភាសា!*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*💬 ឧទាហរណ៍សំណួរ:*

"តើពេលណាដាំស្រូវ?"
"តើធ្វើដូចម្តេចដើម្បីព្យាបាលសត្វល្អិត?"
"តើជីធម្មជាតិអ្វីល្អបំផុត?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌾 *CAMBODIA AGRICULTURE ASSISTANT* 🌾

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*👋 Hello! Who am I?*

I am a professional AI agriculture assistant created by *Anachak Cyb3r* (អនាចក្រ Cyb3r) to help Khmer farmers improve their cultivation practices and increase agricultural productivity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🎯 I can help you with:*

🌱 Crop cultivation (rice, vegetables, fruits)
🐛 Pest and disease management
🌍 Soil health and fertilization
💧 Water management and irrigation
🌿 Organic and sustainable farming
📅 Seasonal planting schedules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🌐 How to use:*

Type in *Khmer* → Get Khmer response
Type in *English* → Get English response

*✨ Automatic - No language selection needed!*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*💬 Example questions:*

"When should I plant rice?"
"How do I treat pests on vegetables?"
"What is the best organic fertilizer?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*⚡ Available 24/7 | អាចប្រើបាន ២៤/៧*

*Ready to help! | រួចរាល់ជួយ!* 🚜`;

const WELCOME_MESSAGE_KM = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌾 *ជំនួយការកសិកម្មកម្ពុជា* 🌾
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*👋 សួស្តី! ខ្ញុំជានរណា?*

ខ្ញុំជាជំនួយការកសិកម្ម AI ប្រកបដោយវិជ្ជាជីវៈ ដែលត្រូវបានបង្កើតឡើងដោយ *Anachak Cyb3r* (អនាចក្រ Cyb3r) ដើម្បីជួយកសិករខ្មែរកែលម្អការដាំដុះ និងបង្កើនផលិតកម្មកសិកម្ម។

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🎯 ខ្ញុំអាចជួយអ្នកអំពី:*

🌱 ការដាំដុះដំណាំ (ស្រូវ បន្លែ ផ្លែឈើ)
🐛 ការគ្រប់គ្រងសត្វល្អិត និងជំងឺ
🌍 សុខភាពដី និងការបង្កកំណើត
💧 ការគ្រប់គ្រងទឹក និងធារាសាស្ត្រ
🌿 កសិកម្មធម្មជាតិ និងនិរន្តរភាព
📅 កាលវិភាគដាំដុះតាមរដូវកាល

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🌐 របៀបប្រើប្រាស់:*

វាយសំណួរជា *ភាសាខ្មែរ* → ទទួលចម្លើយជាខ្មែរ
វាយសំណួរជា *English* → ទទួលចម្លើយជាអង់គ្លេស

*✨ ស្វ័យប្រវត្តិ - មិនចាំបាច់ជ្រើសរើសភាសា!*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*💬 ឧទាហរណ៍សំណួរ:*

"តើពេលណាដាំស្រូវ?"
"តើធ្វើដូចម្តេចដើម្បីព្យាបាលសត្វល្អិត?"
"តើជីធម្មជាតិអ្វីល្អបំផុត?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌾 *CAMBODIA AGRICULTURE ASSISTANT* 🌾

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*👋 Hello! Who am I?*

I am a professional AI agriculture assistant created by *Anachak Cyb3r* (អនាចក្រ Cyb3r) to help Khmer farmers improve their cultivation practices and increase agricultural productivity.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🎯 I can help you with:*

🌱 Crop cultivation (rice, vegetables, fruits)
🐛 Pest and disease management
🌍 Soil health and fertilization
💧 Water management and irrigation
🌿 Organic and sustainable farming
📅 Seasonal planting schedules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*🌐 How to use:*

Type in *Khmer* → Get Khmer response
Type in *English* → Get English response

*✨ Automatic - No language selection needed!*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*💬 Example questions:*

"When should I plant rice?"
"How do I treat pests on vegetables?"
"What is the best organic fertilizer?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*⚡ Available 24/7 | អាចប្រើបាន ២៤/៧*

*Ready to help! | រួចរាល់ជួយ!* 🚜`;

const HELP_MESSAGE_EN = `ℹ️ *How to Use | របៀបប្រើប្រាស់*

━━━━━━━━━━━━━━━━━━━━
*🌾 Steps | ជំហាន*

1️⃣ Type question | វាយសំណួរ
2️⃣ Get advice | ទទួលដំបូន្មាន
3️⃣ Ask more | សួរបន្ថែម

━━━━━━━━━━━━━━━━━━━━
*🌐 Language | ភាសា*

English → English response
ខ្មែរ → ចម្លើយជាខ្មែរ

*✨ Automatic | ស្វ័យប្រវត្តិ*

━━━━━━━━━━━━━━━━━━━━
*💡 Tips | ដំបូន្មាន*

▪️ Be specific | បញ្ជាក់ច្បាស់
▪️ One question | មួយសំណួរ
▪️ Include details | ព័ត៌មានលម្អិត

━━━━━━━━━━━━━━━━━━━━
*⚙️ Commands | ពាក្យបញ្ជា*

/start - Welcome | ស្វាគមន៍
/help - Help | ជំនួយ

*Ready! | រួចរាល់!* 🚜`;

const HELP_MESSAGE_KM = `ℹ️ *How to Use | របៀបប្រើប្រាស់*

━━━━━━━━━━━━━━━━━━━━
*🌾 Steps | ជំហាន*

1️⃣ Type question | វាយសំណួរ
2️⃣ Get advice | ទទួលដំបូន្មាន
3️⃣ Ask more | សួរបន្ថែម

━━━━━━━━━━━━━━━━━━━━
*🌐 Language | ភាសា*

English → English response
ខ្មែរ → ចម្លើយជាខ្មែរ

*✨ Automatic | ស្វ័យប្រវត្តិ*

━━━━━━━━━━━━━━━━━━━━
*💡 Tips | ដំបូន្មាន*

▪️ Be specific | បញ្ជាក់ច្បាស់
▪️ One question | មួយសំណួរ
▪️ Include details | ព័ត៌មានលម្អិត

━━━━━━━━━━━━━━━━━━━━
*⚙️ Commands | ពាក្យបញ្ជា*

/start - Welcome | ស្វាគមន៍
/help - Help | ជំនួយ

*Ready! | រួចរាល់!* 🚜`;

export async function handleStart(ctx: Context): Promise<void> {
  const languageCode = ctx.from?.language_code;
  const language = getLanguageFromCode(languageCode);
  
  const message = language === 'km' ? WELCOME_MESSAGE_KM : WELCOME_MESSAGE_EN;
  
  try {
    await ctx.reply(message, { parse_mode: 'Markdown' });
  } catch {
    // Fallback without markdown if it fails
    await ctx.reply(message);
  }
}

export async function handleHelp(ctx: Context): Promise<void> {
  const languageCode = ctx.from?.language_code;
  const language = getLanguageFromCode(languageCode);
  
  const message = language === 'km' ? HELP_MESSAGE_KM : HELP_MESSAGE_EN;
  
  try {
    await ctx.reply(message, { parse_mode: 'Markdown' });
  } catch {
    // Fallback without markdown if it fails
    await ctx.reply(message);
  }
}
