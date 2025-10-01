function limitLength(input, maxLength) {
  if (input.value.length > maxLength) {
    input.value = input.value.slice(0, maxLength);
  }
}

// دوال صياغة النصوص بالعربي بدون أرقام زائدة
function formatYears(n) {
  if (n === 1) return "سنة";
  if (n === 2) return "سنتين";
  if (n >= 3 && n <= 10) return `${n} سنوات`;
  return `${n} سنة`;
}

function formatMonths(n) {
  if (n === 1) return "شهر";
  if (n === 2) return "شهرين";
  if (n >= 3 && n <= 10) return `${n} شهور`;
  return `${n} شهر`;
}

function formatDays(n) {
  if (n === 1) return "يوم";
  if (n === 2) return "يومين";
  if (n >= 3 && n <= 10) return `${n} أيام`;
  return `${n} يوم`;
}

function calcAge() {
  // اظهار التورته عند الضغط على احسب العمر
  const tortaContainer = document.querySelector(".torta");
  tortaContainer.style.display = "block";

  // اخفاء نص الاختيار مؤقتًا
  let genderElement = document.querySelector(".genderp");
  if (genderElement) {
    genderElement.style.display = "none";
  }

  // اخفاء ديف .age في البداية
  const ageDiv = document.querySelector("#result .age");
  ageDiv.style.opacity = 0;

  // اظهار التورته والكعكة والبالونات كل واحد بكلاس مستقل
  const cakeElement = document.querySelector(".cake");
  const balloonElement = document.querySelector(".palon");

  tortaContainer.classList.add("torta-show");
  cakeElement.classList.add("cake-show");
  balloonElement.classList.add("palon-show");

  // بعد ثانيتين: اخفاء الكعكة، وإظهار ديف .age تدريجيًا
  setTimeout(() => {
    cakeElement.classList.remove("cake-show");

    ageDiv.style.transition = "opacity 0.8s ease-in-out";
    ageDiv.style.opacity = 1; // يظهر بعد التورته
  }, 2000);

  // بعد 14 ثانية: اخفاء البالونات تدريجيًا واخفاء التورته بالكامل
  setTimeout(() => {
    balloonElement.classList.remove("palon-show");
    ageDballoonElementiv.style.transition = "opacity 0.8s ease-in-out";
    tortaContainer.style.display = "none";
  }, 14000);

  // قراءة القيم
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  if (!day || !month || !year) {
    alert("اجى انا اكتبلك تاريخك بالمره");
    return;
  }

  let birthDate = new Date(year, month - 1, day);
  let now = new Date();

  if (birthDate > now) {
    alert("و دى نحسبهالك ازاى بذكائك");
    return;
  }

  let diff = now - birthDate;

  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let daysDiff = Math.floor(hours / 24);
  let weeks = Math.floor(daysDiff / 7);
  let monthsDiff = Math.floor(daysDiff / 30.44);
  let yearsDiff = Math.floor(monthsDiff / 12);

  document.getElementById("years").textContent = yearsDiff.toLocaleString();
  document.getElementById("months").textContent = monthsDiff.toLocaleString();
  document.getElementById("weeks").textContent = weeks.toLocaleString();
  document.getElementById("days").textContent = daysDiff.toLocaleString();
  document.getElementById("hours").textContent = hours.toLocaleString();
  document.getElementById("minutes").textContent = minutes.toLocaleString();
  document.getElementById("seconds").textContent = seconds.toLocaleString();

  // -------------------------------
  // حساب العمر بالتفصيل (سنة + شهر + يوم)
  // -------------------------------
  let y = now.getFullYear() - birthDate.getFullYear();
  let m = now.getMonth() - birthDate.getMonth();
  let d = now.getDate() - birthDate.getDate();

  if (d < 0) {
    m--;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  let gender = document.querySelector('input[name="gender"]:checked')?.value;
  let prefixText = "";

  if (gender === "male" && y < 4) {
    prefixText =
      '<span style="color:gold;">❤️🥰 الكتكوت الصغنن تم 🥰❤️</span><br>';
  } else if (gender === "female" && y < 4) {
    prefixText =
      '<span style="color:gold;">❤️🥰 الكتكوته الصغننه تمت 🥰❤️</span><br>';
  } else {
    prefixText = "عمرك ";
  }

  let ageText = "";
  if (y >= 1) {
    ageText = `${prefixText}${formatYears(y)}`;
    if (m > 0) ageText += ` و ${formatMonths(m)}`;
    if (d > 0) ageText += ` و ${formatDays(d)}`;
  } else if (m >= 1) {
    ageText = `${prefixText}${formatMonths(m)}`;
    if (d > 0) ageText += ` و ${formatDays(d)}`;
  } else {
    ageText = `${prefixText}${formatDays(d)}`;
  }

  document.getElementById("finalAge").innerHTML = `<h3>${ageText}</h3>`;

  // -------------------------------
  // حساب المدة المتبقية لعيد الميلاد القادم 🎂
  // -------------------------------
  let nextBirthday = new Date(
    now.getFullYear(),
    birthDate.getMonth(),
    birthDate.getDate()
  );
  if (nextBirthday < now)
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);

  let diffToBday = nextBirthday - now;
  let daysToBday = Math.ceil(diffToBday / (1000 * 60 * 60 * 24));

  let msg = "";
  let extraLine = "";

  if (y < 18) {
    extraLine = `❤️🥰 <span style="color:gold; font-weight:bold;">كل سنة وانتو طيبين</span> 🥰❤️<br>
    <span style="color:gold; font-weight:bold;">❤️🥰 و عقبال 100 سنه ان شاء الله 🥰❤️</span>`;
  } else {
    extraLine = "الواحد عايش بقاله كتير يا جدعان 😂😂";
  }

  if (daysToBday <= 30) {
    msg = `${extraLine}<br>🎂🎉 فاضل على عيد ميلادى ${formatDays(
      daysToBday
    )} 🎉🎂`;
  } else {
    let monthsLeft = Math.floor(daysToBday / 30);
    let daysLeft = daysToBday % 30;
    msg = `${extraLine}<br>🎂🎉 فاضل على عيد ميلادى ${formatMonths(
      monthsLeft
    )} و ${formatDays(daysLeft)} 🎉🎂`;
  }

  document.getElementById("birthdayLeft").innerHTML = `<h5>${msg}</h5>`;
}
