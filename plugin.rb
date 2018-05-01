# name: create-ticket
# about: A plugin used to create a Salesforce ticket upon topic creation
# version: 0.0.1
# authors: Albert Yu
# url: https://github.com/a-yu-relativity/discourse-salesforce.git

enabled_site_setting :salesforce_enabled

PLUGIN_NAME = "discourse_salesforce".freeze

#register_asset 'stylesheets/salesforce.scss'

after_initialize do
    
  

  module ::Salesforce
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace Salesforce
    end
  end

  require_dependency "application_controller"  # from main discourse

  class Salesforce::TicketController < ApplicationController
    # Creates a Salesforce ticket.
    def create
      post = Post.find(params[:id].to_i)
      topic = post.topic
    end

    # Validates that Salesforce API credentials are present.
    def has_sforce_creds?
      return false if (SiteSetting.salesforce_url.blank? || 
                       SiteSetting.sforce_api_token.blank?)
      true
    end
  end
end