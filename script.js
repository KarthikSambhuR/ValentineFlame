// Meanings for each FLAMES letter.
const meanings = {
    'F': "Friendship",
    'L': "Love",
    'A': "Affection",
    'M': "Marriage",
    'E': "Enemy",
    'S': "Siblings"
  };
  
  // Returns a full brown teddy bear SVG (for final animations).
  function getTeddyBearSVG() {
    return '<svg viewBox="0 0 64 64" width="40" height="40">' +
           '  <ellipse cx="32" cy="44" rx="16" ry="12" fill="#8B4513"/>' +
           '  <circle cx="32" cy="20" r="10" fill="#8B4513"/>' +
           '  <circle cx="22" cy="12" r="3" fill="#8B4513"/>' +
           '  <circle cx="42" cy="12" r="3" fill="#8B4513"/>' +
           '  <circle cx="28" cy="18" r="1.5" fill="#fff"/>' +
           '  <circle cx="36" cy="18" r="1.5" fill="#fff"/>' +
           '  <circle cx="32" cy="22" r="1.5" fill="#fff"/>' +
           '  <path d="M29,24 Q32,27 35,24" stroke="#fff" stroke-width="1" fill="none"/>' +
           '  <ellipse cx="16" cy="44" rx="3" ry="5" fill="#8B4513"/>' +
           '  <ellipse cx="48" cy="44" rx="3" ry="5" fill="#8B4513"/>' +
           '  <ellipse cx="26" cy="56" rx="3" ry="5" fill="#8B4513"/>' +
           '  <ellipse cx="38" cy="56" rx="3" ry="5" fill="#8B4513"/>' +
           '</svg>';
  }
  
  // Animate final result by showing a burst of SVG icons.
  function animateFinalResult(resultMeaning) {
    const finalContainer = document.getElementById("final-animation");
    finalContainer.innerHTML = "";
    let count = 10; // number of icons to display
    for (let i = 0; i < count; i++) {
      let icon;
      if(resultMeaning === "Enemy") {
        // Display a broken heart for Enemy.
        icon = '<svg class="final-icon final-heart" viewBox="0 0 32 29.6" width="40" height="40">' +
               '<path d="M23.6,0c-3.3,0-6.3,1.7-8,4.3C13.7,1.7,10.7,0,7.4,0C3.3,0,0,3.3,0,7.4c0,5.2,4.2,9.4,10.5,15.1L16,29.6l5.5-6.1' +
               'C27.8,16.8,32,12.6,32,7.4C32,3.3,28.7,0,24.6,0H23.6z" fill="#aaa"/></svg>';
      } else {
        // Alternate between heart and teddy bear icons.
        if (i % 2 === 0) {
          icon = '<svg class="final-icon final-heart" viewBox="0 0 32 29.6" width="40" height="40">' +
                 '<path d="M23.6,0c-3.3,0-6.3,1.7-8,4.3C13.7,1.7,10.7,0,7.4,0C3.3,0,0,3.3,0,7.4c0,5.2,4.2,9.4,10.5,15.1L16,29.6l5.5-6.1' +
                 'C27.8,16.8,32,12.6,32,7.4C32,3.3,28.7,0,24.6,0H23.6z" fill="#FF69B4"/></svg>';
        } else {
          icon = getTeddyBearSVG();
        }
      }
      let div = document.createElement("div");
      div.className = "final-icon-container";
      div.style.left = Math.random() * 90 + "%";
      div.style.animationDelay = (Math.random() * 0.5) + "s";
      div.innerHTML = icon;
      finalContainer.appendChild(div);
    }
  }
  
  // Called when the user clicks the button.
  function playFlames() {
    const name1Input = document.getElementById("name1").value.trim().toLowerCase();
    const name2Input = document.getElementById("name2").value.trim().toLowerCase();
    if (!name1Input || !name2Input) {
      alert("Please enter both names!");
      return;
    }
    
    const n1 = name1Input.replace(/\s+/g, "");
    const n2 = name2Input.replace(/\s+/g, "");
    let name1Letters = n1.split("").map(letter => ({ letter, struck: false, highlight: false }));
    let name2Letters = n2.split("").map(letter => ({ letter, struck: false, highlight: false }));
    
    document.getElementById("common-process").style.display = "flex";
    updateCommonProcessDisplay();
    
    function updateCommonProcessDisplay() {
      const name1Display = document.getElementById("name1-display");
      const name2Display = document.getElementById("name2-display");
      name1Display.innerHTML = name1Letters.map(obj => `<span class="name-letter${obj.highlight ? ' highlight' : ''}${obj.struck ? ' struck' : ''}">${obj.letter}</span>`).join(" ");
      name2Display.innerHTML = name2Letters.map(obj => `<span class="name-letter${obj.highlight ? ' highlight' : ''}${obj.struck ? ' struck' : ''}">${obj.letter}</span>`).join(" ");
    }
    
    function animateCommonLetters(index) {
      if (index >= name1Letters.length) {
        // Compute remaining letters
        let count1 = name1Letters.filter(obj => !obj.struck).length;
        let count2 = name2Letters.filter(obj => !obj.struck).length;
        let totalRemaining = count1 + count2;
        document.getElementById("remaining-count").textContent = "Remaining Letters: " + totalRemaining;
        window.remainingCount = totalRemaining;
        // Proceed with FLAMES after a short delay.
        setTimeout(() => {
          startFlamesAnimation();
        }, 1000);
        return;
      }
      if (name1Letters[index].struck) {
        animateCommonLetters(index + 1);
        return;
      }
      let matchIndex = name2Letters.findIndex(obj => obj.letter === name1Letters[index].letter && !obj.struck);
      if (matchIndex !== -1) {
        name1Letters[index].highlight = true;
        name2Letters[matchIndex].highlight = true;
        updateCommonProcessDisplay();
        setTimeout(() => {
          name1Letters[index].highlight = false;
          name2Letters[matchIndex].highlight = false;
          name1Letters[index].struck = true;
          name2Letters[matchIndex].struck = true;
          updateCommonProcessDisplay();
          setTimeout(() => {
            animateCommonLetters(index + 1);
          }, 500);
        }, 500);
      } else {
        animateCommonLetters(index + 1);
      }
    }
    
    animateCommonLetters(0);
    
    function startFlamesAnimation() {
      // We keep the common process visible.
      window.flames = [
        { letter: 'F', active: true, highlight: false, struck: false },
        { letter: 'L', active: true, highlight: false, struck: false },
        { letter: 'A', active: true, highlight: false, struck: false },
        { letter: 'M', active: true, highlight: false, struck: false },
        { letter: 'E', active: true, highlight: false, struck: false },
        { letter: 'S', active: true, highlight: false, struck: false }
      ];
      document.getElementById("animation").innerHTML = "";
      document.getElementById("result").innerHTML = "";
      updateDisplay();
      animateFlames();
    }
  }
  
  function updateDisplay() {
    const container = document.getElementById("animation");
    container.innerHTML = window.flames.map(f => {
      let classes = "flame-letter";
      if (f.highlight) classes += " highlight";
      if (f.struck) classes += " struck-out";
      return `<span class="${classes}">${f.letter}</span>`;
    }).join(" ");
  }
  
  // Modified FLAMES counting animation to show the full counting process.
  function animateFlames() {
    let activeIndices = [];
    for (let i = 0; i < window.flames.length; i++) {
      if (window.flames[i].active) activeIndices.push(i);
    }
    if (activeIndices.length === 1) {
      let finalLetter = window.flames[activeIndices[0]].letter;
      const finalMeaning = meanings[finalLetter];
      document.getElementById("result").innerHTML = `Result: <span>${finalMeaning}</span>`;
      document.getElementById("animation").innerHTML = "";
      animateFinalResult(finalMeaning);
      return;
    }
    // Instead of simply taking modulo, we simulate a full counting process.
    let totalSteps = window.remainingCount; // e.g., 15
    let currentStep = 0;
    function highlightNext() {
      // Clear previous highlights.
      window.flames.forEach(f => f.highlight = false);
      // Highlight the letter at position (currentStep mod activeIndices.length).
      let index = activeIndices[currentStep % activeIndices.length];
      window.flames[index].highlight = true;
      updateDisplay();
      currentStep++;
      if (currentStep < totalSteps) {
        setTimeout(highlightNext, 500);
      } else {
        // At the final step, strike out the highlighted letter.
        let strikeIndex = activeIndices[(currentStep - 1) % activeIndices.length];
        window.flames[strikeIndex].active = false;
        window.flames[strikeIndex].struck = true;
        window.flames[strikeIndex].highlight = false;
        updateDisplay();
        setTimeout(animateFlames, 500);
      }
    }
    highlightNext();
  }
  