import express from 'express';
import AuthenticationMiddleware from '../../../middleware/authMiddleware';
import {
  createMessage,
  deleteMesage,
  editMessage,
  getMessages,
  getMessagesSentByOneUser,
  getOneMessage,
  restrictToSender,
  unreadMessageCount,
  updateMessageToReadForAUser,
} from '../controllers/messageController';

const router = express.Router();

router.use(AuthenticationMiddleware.isUserAuthenticated);

router.get('/', getMessages);
router.post('/create-message', createMessage);
router.get('/user', getMessagesSentByOneUser);
router.patch('/:messageId/update-read', updateMessageToReadForAUser);
router.get('/unread-count', unreadMessageCount);
router
  .route('/:messageId')
  .get(getOneMessage)
  .patch(restrictToSender(), editMessage)
  .delete(restrictToSender(), deleteMesage);

module.exports = router;
