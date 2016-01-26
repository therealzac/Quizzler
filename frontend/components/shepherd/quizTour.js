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
    "Fill in your answers, and then click",
    "'Submit' to get immediate feedback."
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.shepherd-quiz-title right'
});

QuizTour.addStep('header', {
  text: [
    "Keep track of how many questions you've",
    "answered and time remaining here."
  ],
  buttons: [
    {
      text: 'Back',
      action: QuizTour.back
    },
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.header-right bottom'
});

QuizTour.addStep('header2', {
  text: [
    "Your quiz will automatically end after you",
    "answer every question or time runs out."
  ],
  buttons: [
    {
      text: 'Back',
      action: QuizTour.back
    },
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
    "Go ahead and complete the quiz now.",
    "Good luck!"
  ],
  buttons: [
    {
      text: 'Back',
      action: QuizTour.back
    },
    {
      text: 'Finish',
      action: QuizTour.hide
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.header-right bottom'
});

QuizTour.addStep('modal-close', {
  text: [
    "Create and edit tests here."
  ],
  buttons: [
    {
      text: 'Next',
      action: QuizTour.next
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.shepherd-admin-button bottom'
});

QuizTour.addStep('add-quiz', {
  text: [
    "Create a new quiz"
  ],
  buttons: [
    {
      text: 'Back',
      action: QuizTour.back
    },
    {
      text: 'Next',
      action: QuizTour.hide
    }
  ],
  showCancelLink: true,
  classes: 'shepherd-theme-arrows',
  attachTo: '.admin-nav right'
});

module.exports = QuizTour;
