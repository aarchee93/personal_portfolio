//this is for structure building for text animation
function valueSetters() {
  gsap.set("#nav", {
    y: "-100%",
  });
  gsap.set("#home span .Child", {
    y: "100%",
  });
  gsap.set("#home .row img", {
    opacity: 0,
  });
  document.querySelectorAll("#Visual>g").forEach(function (e) {
    let character = e.childNodes[1].childNodes[1];
    character.style.strokeDasharray = character.getTotalLength() + "px";
    character.style.strokeDashoffset = character.getTotalLength() + "px";
  });
}

function revealToSpan() {
  console.log("function executed");
  document.querySelectorAll(".reveal").forEach(function (elem) {
    let Parent = document.createElement("span");
    let Child = document.createElement("span");

    Parent.classList.add("Parent");
    Child.classList.add("Child");

    Child.innerHTML = elem.innerHTML;
    Parent.appendChild(Child);

    elem.innerHTML = " ";
    elem.appendChild(Parent);
  });
}
//gsap animation
function loaderAnimation() {
  let tl = gsap.timeline();
  tl.from("#loader .Child span ", {
    x: "100",
    delay: 0.5,
    stagger: 0.5,
    duration: 1,
    ease: Power3.easeInOut, //we can also use Circ.easeInOut
  });
  tl.to("#loader.Parent .Child ", {
    y: "-150%",
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: Circ.easeInOut, //we can also use Circ.easeInOut
  });
  tl.to("#loader ", {
    height: "0",
    duration: 1,
    ease: Circ.easeInOut, //we can also use Circ.easeInOut
  });

  tl.to("#green ", {
    height: "50%",
    top: 0,
    delay: -0.5,
    duration: 0.5,
    ease: Circ.easeInOut, //we can also use Circ.easeInOut
  });
  tl.to("#green ", {
    height: "0",
    top: 0,
    duration: 0.5,
    ease: Circ.easeInOut, //we can also use Circ.easeInOut
    onComplete: function () {
      animateHomepage();
    },
  });
}

function animateSvg() {
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    duration: 3,
    ease: Expo.easeInOut,
  });
}

function animateHomepage() {
  let tl = gsap
    .timeline()
    .to("#nav", {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.5,
      ease: Expo.easeInOut,
    })
    .to("#home .Parent .Child", {
      y: 0,
      duration: 2,
      stagger: 0.1,
      ease: Expo.easeInOut,
    })
    .to("#home .row img", {
      y: 0,
      opacity: 1,
      ease: Expo.easeInOut,
      onComplete: function () {
        animateSvg();
      },
    });
  document.querySelector(".hide").style.opacity = 0;
  document.querySelector(".hide-2").style.opacity = 0;
  document.querySelector(".hide-3").style.opacity = 0;
  document.querySelector(".hide-4").style.opacity = 0;
}

function initLocomotive() {
  console.log("scrolling enabled ");
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
}

function cardHover() {
  document.querySelectorAll(".container").forEach(function (cnt) {
    let showingimage;
    cnt.addEventListener("mousemove", function (dets) {
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.opacity = 1;
      showingimage = dets.target;
      document.querySelector("#cursor").children[
        dets.target.dataset.index
      ].style.transform = `translate(${dets.clientX}px , ${dets.clientY}px )`;
      showingimage.style.filter = "grayscale(1)";

      document.querySelector("#work").style.backgroundColor =
        "#" + dets.target.dataset.color;
    });

    cnt.addEventListener("mouseleave", function (dets) {
      document.querySelector("#cursor").children[
        showingimage.dataset.index
      ].style.opacity = 0;
      showingimage.style.filter = "grayscale(0)";
      document.querySelector("#work").style.backgroundColor = "#fff";
    });
  });
}

//this is most important i.e order of functions
revealToSpan();
valueSetters();
loaderAnimation();
cardHover();
