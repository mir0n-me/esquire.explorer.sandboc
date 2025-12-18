/**
 * The EsquireController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/EsquireService');
const esquire = async (request, response) => {
  await Controller.handleRequest(request, response, service.esquire);
};

const esquireCmd = async (request, response) => {
  await Controller.handleRequest(request, response, service.esquireCmd);
};

const esquireDictionary = async (request, response) => {
  await Controller.handleRequest(request, response, service.esquireDictionary);
};

const esquireEntityNode = async (request, response) => {
  await Controller.handleRequest(request, response, service.esquireEntityNode);
};

const esquirePath = async (request, response) => {
  await Controller.handleRequest(request, response, service.esquirePath);
};


module.exports = {
  esquire,
  esquireCmd,
  esquireDictionary,
  esquireEntityNode,
  esquirePath,
};
