const timeout = 5;

function getRandomMovie(id: string, button: HTMLButtonElement): void {
  const previousWheel = document.getElementById("wheel");
  if (previousWheel) {
    previousWheel.remove();
  }
  const previousResult = document.getElementById("result");
  if (previousResult) {
    previousResult.remove();
  }

  let moviesToWatch = collectMovies(id);

  const canvas = document.createElement("canvas");
  canvas.id = "wheel";
  canvas.width = 500;
  canvas.height = 500;
  button.insertAdjacentElement("afterend", canvas);

  const wheel = new SpinningWheel("wheel", moviesToWatch);
  wheel.drawWheel();
  wheel.spin();

  //wait 5 seconds before showing the result

  setTimeout(() => {
    let randomMovie =
      moviesToWatch[Math.floor(Math.random() * moviesToWatch.length)];
    const result = document.createElement("h2");
    result.id = "result";
    result.textContent = "random movie: ";

    const movieLink = document.createElement("a");
    movieLink.href = `https://imdb.com/find/?q=${encodeURIComponent(randomMovie)}`;
    movieLink.textContent = randomMovie;
    movieLink.target = "_blank";

    result.appendChild(movieLink);
    canvas.insertAdjacentElement("afterend", result);
  }, timeout * 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  let headings: NodeListOf<HTMLHeadingElement> =
    document.querySelectorAll("h1");

  headings.forEach((heading) => {
    if (
      heading.innerHTML != "movies" &&
      heading.id !== "index" &&
      heading.id !== "dropped-movies"
    ) {
      const button = document.createElement("button");
      button.textContent = "I'm feelin' lucky";
      button.addEventListener("click", () => {
        getRandomMovie(heading.id, button);
      });
      heading.insertAdjacentElement("afterend", button);
    }
  });
});

function collectMovies(id: string) {
  const heading = document.getElementById(id) as HTMLElement;
  const headingContent: string = (
    heading.nextElementSibling?.nextElementSibling as HTMLElement
  ).innerText;

  let moviesToWatch = headingContent
    .split("\n")
    .filter((x) => !x.includes("BREAK"))
    .filter((x) => !/\(\d{4}-\d{2}-\d{2}\)$/.test(x));

  return moviesToWatch;
}
class SpinningWheel {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private segments: string[];
  private angle: number = 0;
  private baseSpeed: number = Math.PI / 16;
  private spinTimeout: number = timeout;
  private currentSpinTime: number = 0;
  public spinTime: number = 0;

  constructor(canvasId: string, segments: string[]) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.segments = segments;
  }

  drawWheel() {
    const { ctx, canvas, segments } = this;
    const numSegments = segments.length;
    const anglePerSeg = (2 * Math.PI) / numSegments;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numSegments; i++) {
      const angle = this.angle + i * anglePerSeg;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + anglePerSeg);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? "#ffffff" : "#ffcc00";
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + anglePerSeg / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#333";
      ctx.font = "14px Arial";
      ctx.fillText(segments[i], radius - 10, 0);
      ctx.restore();
    }

    this.angle += this.baseSpeed;
  }

  spin() {
    this.spinTime = timeout;
    this.currentSpinTime = 0;
    this.rotateWheel();
  }

  rotateWheel() {
    this.currentSpinTime += 20;
    if (this.currentSpinTime >= this.spinTime * 1000) {
      clearTimeout(this.spinTimeout);
      return;
    }
    this.drawWheel();
    this.spinTimeout = setTimeout(() => this.rotateWheel(), 20);
  }
}
