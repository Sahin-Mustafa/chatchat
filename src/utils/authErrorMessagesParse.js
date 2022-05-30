export default function (errorCode) {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid E-mail adress';

    case 'auth/email-already-exists':
      return 'E-mail already exists';

    case 'auth/user-not-found':
      return 'User not found';

    case 'auth/weak-password':
      return 'Weak Password';
    case 'auth/wrong-password':
      return 'Wrong Password';
    default:
      return errorCode;
  }
}
