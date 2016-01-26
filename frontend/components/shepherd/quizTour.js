var Shepherd = require('tether-shepherd');

var QuizTour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows'
  }
});

QuizTour.addStep('start-button', {
  text: [
    "Welcome to Quizzler! Click the 'Start' button to begin your quiz!"
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.hide
    }
  ],
  showCancelLink: true,
  advanceOn: '.start-button click',
  classes: 'shepherd-theme-arrows',
  attachTo: '.start-button right'
});

QuizTour.addStep('question', {
  text: [
    "Fill in your answers, and then click 'Submit' to get immediate feedback."
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.quiz-title bottom'
});

QuizTour.addStep('header', {
  text: [
    "Keep track of how many questions you've answered and time remaining here."
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.header-right bottom'
});

QuizTour.addStep('quiz-ending', {
  text: [
    "Your quiz will automatically end after you answer every question or time runs out."
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.header-right bottom'
});

QuizTour.addStep('quiz-ending', {
  text: [
    "Go ahead and complete the quiz now. Good luck!"
  ],
  buttons: [
    {
      text: 'Finish',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.header-right bottom'
});

module.exports = QuizTour;
