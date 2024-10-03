import { Module } from "@nestjs/common";
import { FavoriteSchema } from "src/entities/favorites.schema";

import { MoviesControllers } from "src/controllers/movies.controller";

import { AddFavoriteMoviesService } from "src/services/movies/AddFavoriteMoviesService";
import { GetAllPopularMoviesService } from "src/services/movies/GetAllPopularMoviesService";
import { GetAllFavoriteMoviesService } from "src/services/movies/GetAllFavoriteMoviesService";

import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [],
    controllers: [MoviesControllers],
    providers: [AddFavoriteMoviesService, GetAllPopularMoviesService, GetAllFavoriteMoviesService],
})
export class AppModule {}

