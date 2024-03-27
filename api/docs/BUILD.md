<p style="text-align: center; color: orange;font-size: 48px">Local Setup</p> 

## <p style="color: orange">Technologies Needed</p>

- [Git](https://git-scm.com/)
- [Docker](https://docs.docker.com/) ( If using Laravel Sail )
- [Composer 2](https://getcomposer.org/)
- [Php 8.2](https://www.php.net/)

## <p style="color: orange">Instructions</p>
1. Clone the Github Repo using the following command below
    ```sh
    $ git clone https://github.com/Dlewis89/skate-challenge.git
    ```
1. Change directory to the api project
    ```sh
    $ cd api
    ```
1. Run Composer Install
    ```sh
    $ composer install
    ```
1. Copy .env.example to a .env file

1. Setup:
    - a. Setup with Laravel Sail
        ```sh
        $ ./vendor/bin/sail up
        $ ./vendor/bin/sail artisan migrate
        $ ./vendor/bin/sail artisan db:seed
        $ ./vendor/bin/sail artisan passport:client --personal
        ```
    - a. Setup without Laravel Sail
        ```
        $ php artisan migrate
        $ php artisan db:seed
        $ php artisan passport:client --personal
        ```
1.  Testing Verification
    - a. Run Test with Laravel Sail
        ```sh
        $ ./vendor/bin/sail artisan test
    - a. Run test without Laravel Sail
        ```sh
        $ php artisan test
        ```