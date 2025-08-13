version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: postgres_db
    environment:
      POSTGRES_DB: Product_BD      # Nom correct de la BDD
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123456
    ports:
      - "5433:5432"                # accès depuis l'hôte sur port 5433
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d  
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d Product_BD"] # Nom correct de la BDD ici aussi
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  api:
    build:
      context: ./backend            
      dockerfile: Dockerfile
    container_name: dotnet_api
    environment:
      ASPNETCORE_ENVIRONMENT: Development
      ASPNETCORE_URLS: http://+:8080
      PG_HOST: postgres
      PG_DATABASE: Product_BD
      PG_USERNAME: postgres
      PG_PASSWORD: 123456
      PG_PORT: "5432"
    ports:
      - "5000:8080" 
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend  
      dockerfile: Dockerfile
    container_name: angular_frontend
    ports:
      - "4200:80" 
    depends_on:
      - api
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
