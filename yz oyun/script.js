const gameContainer = document.querySelector(".container"),
      userResult = document.querySelector(".user_result img"),
      cpuResult  = document.querySelector(".cpu_result img"),
      result  = document.querySelector(".result"),
      optionImages = document.querySelectorAll(".option_image");

let userScore = 0;
let cpuScore = 0;
const userScoreEl = document.getElementById("user-score");
const cpuScoreEl = document.getElementById("cpu-score");
const resetBtn = document.getElementById("reset-btn");

// Animasyon temizleme
function clearAnimations() {
  userResult.parentElement.classList.remove("win");
  cpuResult.parentElement.classList.remove("win");
}

// Animasyon süresini JS’den değiştirmek için
const shakeDuration = 0.5; // saniye cinsinden
document.documentElement.style.setProperty('--shake-duration', `${shakeDuration}s`);

// Oyun mantığı
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "tas.png";
    result.textContent = "Oyun Başlıyor...";

    optionImages.forEach((image2, index2) => {
      if(index !== index2) image2.classList.remove("active");
    });

    // Sallanma animasyonu başlat
    gameContainer.classList.add("start");

    // 0.3 saniye sonra animasyonu durdur ve sonucu göster
    setTimeout(() => {
      gameContainer.classList.remove("start");
      clearAnimations();

      let img = image.querySelector("img");
      userResult.src = img.src;

      let randomNumber = Math.floor(Math.random() * 3);
      const cpuImages = ["tas.png" , "kagit.png" , "makas.png"];
      cpuResult.src = cpuImages[randomNumber];

      let cpuValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      let outcomes = {
        RR: "Berabere",
        PP: "Berabere",
        SS: "Berabere",
        RP: "Bilgisayar",
        PS: "Bilgisayar",
        SR: "Bilgisayar",
        RS: "Oyuncu",
        PR: "Oyuncu",
        SP: "Oyuncu",
      };

      let outComeValue = outcomes[userValue + cpuValue];
      result.textContent = userValue === cpuValue ? "Berabere!" : `${outComeValue} Kazandı!`;

      if(outComeValue === "Oyuncu") {
        userScore++;
        userScoreEl.textContent = userScore;
      } else if(outComeValue === "Bilgisayar") {
        cpuScore++;
        cpuScoreEl.textContent = cpuScore;
      }

    }, shakeDuration * 1000); // animasyon süresi ile eşleşiyor
  });
});

// Reset
resetBtn.addEventListener("click", () => {
  userScore = 0;
  cpuScore = 0;
  userScoreEl.textContent = 0;
  cpuScoreEl.textContent = 0;
  result.textContent = "Skor sıfırlandı! Yeni oyuna hazır 🎮";
  clearAnimations();
});
