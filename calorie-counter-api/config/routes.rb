# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#    api_v1_calorie_entries GET    /api/v1/calorie_entries(.:format)                                                        api/v1/calorie_entries#index
#                           POST   /api/v1/calorie_entries(.:format)                                                        api/v1/calorie_entries#create
#      api_v1_calorie_entry GET    /api/v1/calorie_entries/:id(.:format)                                                    api/v1/calorie_entries#show
#                           PATCH  /api/v1/calorie_entries/:id(.:format)                                                    api/v1/calorie_entries#update
#                           PUT    /api/v1/calorie_entries/:id(.:format)                                                    api/v1/calorie_entries#update
#                           DELETE /api/v1/calorie_entries/:id(.:format)                                                    api/v1/calorie_entries#destroy
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :calorie_entries
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
