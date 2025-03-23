const RAW_PUNCS = {
  '，': ', ', // Chinese comma to English comma
  '、': ',', // Chinese enumeration comma to English comma
  '；': '; ', // Chinese semicolon to English semicolon
  '。': '. ', // Chinese period to English period
  '！': '! ', // Chinese exclamation mark to English exclamation mark
  '？': '? ', // Chinese question mark to English question mark
  '：': ': ', // Chinese colon to English colon
  '—': '-', // Chinese hyphen to English hyphen
  '“': '"', // Chinese left double quotation mark to English double quotation mark
  '”': '"', // Chinese right double quotation mark to English double quotation mark
  '‘': '\'', // Chinese left single quotation mark to English single quotation mark
  '’': '\'', // Chinese right single quotation mark to English single quotation mark
  '（': '(', // Chinese left parenthesis to English left parenthesis
  '）': ')', // Chinese right parenthesis to English right parenthesis
  '【': '[', // Chinese left square bracket to English left square bracket
  '】': ']', // Chinese right square bracket to English right square bracket
  '《': '<', // Chinese left angle bracket to English left angle bracket
  '》': '>', // Chinese right angle bracket to English right angle bracket
  '〈': '<', // Chinese left angle bracket to English left angle bracket
  '〉': '>', // Chinese right angle bracket to English right angle bracket
  '\u2028': '\n', // Line separator to newline
  '\u2029': '\n', // Paragraph separator to newline
}

// Function to convert Chinese punctuation to English punctuation
export const convPuncs = text => text
  .replace(/[，、；。！？：—“”‘’（）【】《》〈〉\u2028\u2029]/g, (match) => RAW_PUNCS[match] ?? match) // Replace Chinese punctuation with English punctuation
// .replace(/[-—]+/g, '-') // Replace multi hyphens with a single hyphen
// .replace(/(\S)-(\S)/g, '$1 - $2') // Add space before and after hyphens
// .replace(/\s+/g, ' ') // Remove extra spaces
// .trim() // Trim the string

export const replaceable = (dict) => Object.defineProperty(dict, Symbol.replace, {
  value(word) {
    for (let [ x, y ] of this) word = word.replace(x, y)
    return word
  },
  configurable: true,
  enumerable: false,
})

const RAW_SIGNS = replaceable(Object.entries({
  '->': '→',
  '<-': '←',
  '⇧': '↑',
  '⇩': '↓',
  '⊣': '⫣',
}))

// Function to convert ASCII arrows and signs to Unicode symbols
export const convSigns = text => text.replace(RAW_SIGNS)

