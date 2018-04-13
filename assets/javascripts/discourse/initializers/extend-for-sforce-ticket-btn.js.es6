import Topic from 'discourse/models/topic';
import User from 'discourse/models/user';
import TopicStatus from 'discourse/raw-views/topic-status';
import { popupAjaxError } from 'discourse/lib/ajax-error';
import { withPluginApi } from 'discourse/lib/plugin-api';
import { ajax } from 'discourse/lib/ajax';
import PostCooked from 'discourse/widgets/post-cooked';

// create a Salesforce ticket from post
function createTicket(post) {
	// extract the topic title
	const topic = post.topic;
	const title = topic.title;

	// get the URL
	const url = topic.url;

	// get the post body (cooked = HTML)
	var body = post.get('cooked');

	// mark post as ticket created
	post.setProperties({
		ticket_created: true
	})
}


function initializeWithApi(api) {
	const currentUser = api.getCurrentUser();

	api.includePostAttributes(
		'ticket_created'
		);


	api.addPostMenuButton('created_sforce', attrs => {
		const createdTicket = attrs.ticket_created;
		if (!createdTicket) {
			return {
				action: 'createTicket'
			}
		}
		else {

		}
	});

	api.attachWidgetAction('post', 'createTicket', function() {
    const post = this.model;
    // const current = post.get('topic.postStream.posts').filter(p => {
    //   return p.get('post_number') === 1 || p.get('accepted_answer');
    // });    
    createTicket(post);

    // current.forEach(p => this.appEvents.trigger('post-stream:refresh', { id: p.id }));
  });
}

export default {
	name: 'extend-for-sforce-ticket-btn',
	initialize() {
		withPluginApi('0.0.1', initializeWithApi);

	}
};