/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log('finally my lambda is working!!!');
  console.log(event);
  return event;
};
