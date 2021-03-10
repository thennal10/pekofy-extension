
const text_elems = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')

for (var element of text_elems) {
    const text = element.innerHTML + '\n'

    /* If blank string */
    if (text == '\n') {
        continue
    }
    /* If it contains html (or anything than can be mistaken for html) */
    if (/<\/?[a-z][\s\S]*>/i.test(text)) {
        continue
    }

    let en_punctuation_list = ['.', '?', '!', '\n']
    let jp_punctuation_list = ['。', '？', '！', '」', '・']
    const punctuation_list = en_punctuation_list.concat(jp_punctuation_list)
    const en_keyword = ' peko'

    /* pattern looks incomprehensible, but it just matches links, and any punctuation at the end (plus parenthesis) */
    let link_pattern = 'https?:\/\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]*\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'
    /* pattern matches any punctuation not in a link */
    const punctuation_pattern = new RegExp(`(?<!(${link_pattern}))([${punctuation_list.join('')}]+)`, 'g')

    var new_text = text
    /* offset to account for adding keywords */
    let offset = 0

    let match
    while ((match = punctuation_pattern.exec(text)) !== null) {
        let i = match.index + offset
        let last_word = /\w+/g.exec(new_text.slice(0, i).split("").reverse().join(""))
        
        let j
        try {
            j = i - last_word.index
        }
        catch (TypeError) {
            continue
        }

        new_text = [new_text.slice(0, j), en_keyword, new_text.slice(j)].join('')

        offset += en_keyword.length
    }
    
    if (text != new_text){
        element.innerHTML = new_text
    }
}