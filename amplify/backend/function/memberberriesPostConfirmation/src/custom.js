/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const appSyncId = process.env.API_MEMBERBERRIES_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${appSyncId}-${env}`;
// const TableName = 'User-heksl2hjrvdr3ey5mowuvph4lm-staging';

const userExist = async id => {
  const params = {TableName, Key: {id}};
  try {
    const data = await docClient.get(params).promise();
    return !!data.Item;
  } catch (error) {
    console.log('Get user error', error);
    return false;
  }
};
const saveUser = async user => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();
  const Item = {
    ...user,
    __typename: 'User',
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {TableName, Item};
  try {
    const data = await docClient.put(params).promise();
    console.log("User saved", data)
  } catch (error) {
    console.log('Save user error', error);
  }
};

exports.handler = async (event, context) => {
  console.log('finally my lambda is working!!!');
  console.log(event);
  if (!event?.request?.userAttributes) {
    console.log('No user data available');
    return;
  }
  const {sub, name, email} = event.request.userAttributes;
  const newUser = {
    id: sub,
    owner: sub,
    name,
    email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };

  if (!(await userExist(newUser.id))) {
    await saveUser(newUser);
  } else {
    console.log("User alredy exists")
  }

  return event;
};
