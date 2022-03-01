To check whether the kafka is running on local we can use


kafka-console-producer --broker-list localhost:9092 --topic test

kafka-console-consumer --bootstrap-server localhost:9092 --topic test --from-beginning



docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 -d confluentinc/cp-kafka 



Had the same issue. What helped was actualy:
Creating a bridge network: docker network create -d bridge kafka-network

Running a Zookeeper within this network: docker run -d -p 2181:2181 --network kafka-network --name zookeeper zookeeper:latest along with exposing port 2181

Running a Kafka docker attaching it to the network and using Zookeeper's container name as a host: docker run -d -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -p 9092:9092 --network kafka-network --name kafka confluentinc/cp-kafka:latest

docker-compose --env-file ./.env.development up 