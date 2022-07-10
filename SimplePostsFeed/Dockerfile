FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["SimplePostsFeed/SimplePostsFeed.csproj", "SimplePostsFeed/"]
RUN dotnet restore "SimplePostsFeed/SimplePostsFeed.csproj"
COPY . .
WORKDIR "/src/SimplePostsFeed"
RUN dotnet build "SimplePostsFeed.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SimplePostsFeed.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SimplePostsFeed.dll"]
