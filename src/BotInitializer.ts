/**
 * This file is used to handle all the code associated to the Telegram bot,
 * using the Telegraf library. All the triggers (like commands and message) are defined here.
 */
import { CATEGORY_PREFIX, ROUND_PREFIX } from './ButtonGenerator';
import { handleMessage, onCategoryChoice, onRoundChoice, resetQuiz, sendCategoryChoiceMessage, stopQuiz } from './index';
import { QuiztitiContext } from './QuiztitiContext';

/**
 * Initialize all the bot commands that we need to listen to
 * @param bot: bot provided by Telegraf
 */
export const initializeBot = (bot) => {

  bot.command('/start@helayxa_quiztiti_bot', (ctx) => {
    console.log('/start command has been triggered');
    resetQuiz();
    sendCategoryChoiceMessage(ctx);
  });

  bot.command('stop@helayxa_quiztiti_bot', (ctx) => {
    console.log('/stop command has been triggered');
    stopQuiz(ctx);
  });

  /**
   * Triggered when we launch the '/start' command from the chat.
   * Reset quiz data and start the quiz configuration
   */
  bot.command('/start', (ctx) => {
    console.log('/start command has been triggered');
    resetQuiz();
    sendCategoryChoiceMessage(ctx);
  });

  /**
   * Triggered when we launch the '/stop' command from the chat.
   * Stop the current Quiz.
   */
  bot.command('stop', (ctx) => {
    console.log('/stop command has been triggered');
    stopQuiz(ctx);
  });

  /**
   * Listen to messages, when choosing the category, matching with the RegExp of categories name
   */
  bot.hears(new RegExp(`${CATEGORY_PREFIX}[\w]*`, 'g'), (ctx) => {
    console.log('Hearing message for category selection');
    onCategoryChoice(ctx);
  });

  /**
   * Listen to messages, when choosing the round, matching with the RegExp of round number
   */
  bot.hears(new RegExp(`${ROUND_PREFIX}[\d]*`, 'g'), (ctx) => {
    console.log('Hearing message for round selection');
    onRoundChoice(ctx);
  });

  /**
   * Triggered on every message that hasn't already been handled by bot.hears above
   */
  bot.on('text', (ctx: QuiztitiContext) => {
    handleMessage(ctx);
  });

  // Activate polling to fetch the last messages received
  bot.startPolling();
};