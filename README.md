# UH Groupings #
Instructions coming soon.

## Setup
To setup UHGroupings, you need to clone the Git repo with the following command:
`git clone git@github.com:Unicon/uhgroupings.git`

### Install Composer (system wide)
<!--
Laravel utilizes Composer to manage its dependencies. Without composer installed locally and on the server environments Laravel will not be able to work. Run the following commands:
`$ curl -sS https://getcomposer.org/installer | php`
`$ mv composer.phar /usr/local/bin/composer`

You will now be able to run the composer command from anywhere on the server.
Note: If the above fails due to permissions, run the mv line again with sudo
-->


## Backend
- copy .env.example to .env

### Development
- edit .env and set the APP_ENV to 'development'

### Production
- edit .env and set the APP_ENV to 'development'


## Frontend
- change into the 'public' directory
- run `npm install`

### Development
- run `grunt` to to set the code up for development use.

### Production
- run `grunt prod` to run the minification scripts and to set the code up for production use.