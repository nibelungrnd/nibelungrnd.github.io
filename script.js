window.onload = function() {
    consoleText([
        {
            text: 'Piercing the Veil of Web3 Research.',
            colorWords: [{ word: 'Veil', color: '#FF5F1F', startIndex: 13 }]
        },

        {
            text: 'Unlocking Digital Sovereignty.',
            colorWords: [{ word: 'Sovereignty', color: '#FF5F1F', startIndex: 18 }]
        },
        {
            text: 'Advancing the Frontiers of DeFi.',
            colorWords: [{ word: 'Frontiers', color: '#ff8f6b', startIndex: 14 }]
        },
        {
            text: 'Shaping the Protocol of Tomorrow.',
            colorWords: [{ word: 'Protocol', color: '#FF5F1F', startIndex: 11 }]
        },
        {
            text: 'Empowering the Vision of Web3.',
            colorWords: [{ word: 'Vision', color: '#ff8f6b', startIndex: 15 }]
        },
        {
            text: 'Crafting Digital Innovation.',
            colorWords: [{ word: 'Innovation', color: '#FF5F1F', startIndex: 15 }]
        },
        {
            text: 'Pioneering Blockchain Evolution.',
            colorWords: [{ word: 'Evolution', color: '#ff8f6b', startIndex: 20 }]
        },
        {
            text: 'Redefining Digital Ownership.',
            colorWords: [{ word: 'Ownership', color: '#FF5F1F', startIndex: 17 }]
        },
        {
            text: 'Accelerating Web3 Progress.',
            colorWords: [{ word: 'Progress', color: '#ff8f6b', startIndex: 18 }]
        },
        {
            text: 'Building the Future of Web3.',
            colorWords: [{ word: 'Future', color: '#ff8f6b', startIndex: 13 }]
        },
        {
            text: 'Transforming the Paradigm of DeFi.',
            colorWords: [{ word: 'Paradigm', color: '#FF5F1F', startIndex: 16 }]
        },
        {
            text: 'Engineering the Future of Value.',
            colorWords: [{ word: 'Value', color: '#ff8f6b', startIndex: 23 }]
        },
        {
            text: 'Revolutionizing Digital Nativeness.',
            colorWords: [{ word: 'Trust', color: '#FF5F1F', startIndex: 22 }]
        },
        {
            text: 'Expanding the Horizon of Web3.',
            colorWords: [{ word: 'Horizon', color: '#ff8f6b', startIndex: 14 }]
        },
        {
            text: 'Mastering On-Chain Intelligence.',
            colorWords: [{ word: 'Intelligence', color: '#FF5F1F', startIndex: 14 }]
        }
    ], 'text');
}

function consoleText(words, id) {
    var visible = true;
    var con = document.getElementById('console');
    var letterCount = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    
    function colorizeText(text, colorWords, upToIndex) {
        let result = text.substring(0, upToIndex);
        for (let wordInfo of colorWords) {
            const wordEnd = wordInfo.startIndex + wordInfo.word.length;
            if (upToIndex > wordInfo.startIndex) {
                const colorStart = Math.max(wordInfo.startIndex, 0);
                const colorEnd = Math.min(upToIndex, wordEnd);
                if (colorStart < colorEnd) {
                    result = text.substring(0, colorStart) +
                            `<span style="color: ${wordInfo.color}">` +
                            text.substring(colorStart, colorEnd) +
                            '</span>' +
                            text.substring(colorEnd, upToIndex);
                }
            }
        }
        return result;
    }

    window.setInterval(function() {
        if (letterCount === 0 && waiting === false) {
            waiting = true;
            target.innerHTML = '';
            window.setTimeout(function() {
                var usedWord = words.shift();
                words.push(usedWord);
                x = 1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (letterCount === words[0].text.length + 1 && waiting === false) {
            waiting = true;
            window.setTimeout(function() {
                x = -1;
                letterCount += x;
                waiting = false;
            }, 1000);
        } else if (waiting === false) {
            target.innerHTML = colorizeText(
                words[0].text,
                words[0].colorWords || [],
                letterCount
            );
            letterCount += x;
        }
    }, 120);
    
    window.setInterval(function() {
        if (visible === true) {
            con.className = 'console-underscore hidden';
            visible = false;
        } else {
            con.className = 'console-underscore';
            visible = true;
        }
    }, 400);
} 