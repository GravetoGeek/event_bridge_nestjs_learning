import {Instance} from "@cdktf/provider-aws/lib/instance"
import {KeyPair} from "@cdktf/provider-aws/lib/key-pair"
import {AwsProvider} from '@cdktf/provider-aws/lib/provider'
import {S3Bucket} from "@cdktf/provider-aws/lib/s3-bucket"
import {S3BucketObject} from '@cdktf/provider-aws/lib/s3-bucket-object'
import {App,TerraformOutput,TerraformStack} from "cdktf"
import {Construct} from "constructs"
import * as fs from "fs"

class MyStack extends TerraformStack {
    constructor(scope: Construct,id: string) {
        super(scope,id)

        // define resources here
        // const keyPath=`${os.homedir()}/.ssh/id_rsa.pub`
        const publicKey=fs.readFileSync("localstack.pub","utf-8")


        // Example: AWS provider
        new AwsProvider(this,"AWS",{
            region: "us-east-1",
            skipCredentialsValidation: true,
            s3UsePathStyle: true,
            accessKey: "gravetogeek",
            secretKey: "12345",
            endpoints: [
                {
                    ec2: "http://localhost:4566",
                    s3: "http://localhost:4566",
                    iam: "http://localhost:4566",
                    sts: "http://localhost:4566",
                    route53: "http://localhost:4566",
                    cloudwatch: "http://localhost:4566",
                    cloudtrail: "http://localhost:4566",
                    lambda: "http://localhost:4566",
                    dynamodb: "http://localhost:4566",
                    rds: "http://localhost:4566",
                    sns: "http://localhost:4566",
                    sqs: "http://localhost:4566",
                    elbv2: "http://localhost:4566",
                    autoscaling: "http://localhost:4566",
                    cloudfront: "http://localhost:4566",
                    ecr: "http://localhost:4566",
                    ecs: "http://localhost:4566",
                    eks: "http://localhost:4566",
                    elasticache: "http://localhost:4566",
                    redshift: "http://localhost:4566",
                    elasticsearch: "http://localhost:4566",
                    kinesis: "http://localhost:4566",
                    stepfunctions: "http://localhost:4566",
                    cloudformation: "http://localhost:4566",
                    cloudwatchlogs: "http://localhost:4566",
                    cloudwatchevents: "http://localhost:4566",
                }
            ]

        })

        const keyPair=new KeyPair(this,"keyPair",{
            keyName: "myec2keypair",
            publicKey: publicKey,
        })

        // Example: S3 bucket
        const bucket=new S3Bucket(this,"bucket",{
            bucket: "eventbridge",
            // acl: "private",
            // versioning: {
            //     enabled: true,
            // },
        })

        new S3BucketObject(this,"object",{
            bucket: bucket.bucket,
            key: "deploy.zip",
            source: "./deploy.zip",
            etag: `"${Date.now()}"`, // Para forçar o reupload em cada deploy
        })

        // Example: EC2 instance

        const instance=new Instance(this,"instance",{
            ami: "ami-0750a20e9959e44ff", // Ubuntu 20.04 LTS
            instanceType: "t2.micro",
            keyName: keyPair.keyName,
            tags: {
                Name: "MyInstance",
            },
            userData: `#!/bin/bash
            # Instalação do Node.js e npm
            curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
            sudo apt-get install -y nodejs
            # Instalação do AWS CLI
            curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
            unzip awscliv2.zip
            sudo ./aws/install
            # Download e instalação da aplicação
            aws s3 cp s3://${bucket.bucket}/deploy.zip /home/ubuntu/deploy.zip
            sudo apt-get install -y unzip
            unzip /home/ubuntu/deploy.zip -d /home/ubuntu/app
            cd /home/ubuntu/app
            npm install
            npm run start:dev
            `,
        })



        new TerraformOutput(this,'public_ip',{
            value: instance.publicIp,
            description: "Public IP of the EC2 instance",
        })
        // Example: S3 bucket

    }
}

const app=new App()
new MyStack(app,"infra")
app.synth()
