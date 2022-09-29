# BootcampWebsite

## What is it?
In this project we make a website which simulates an online food ordering system, in which you can choose from a selection of dishes on a menu. Once the order is complete, the program shows the total amount that has to be paid.

## Execution
The front-end of this project is a website, which can be accessed [here](https://stefsite.z13.web.core.windows.net/).


## Flow diagrams
In the flow diagrams below you can see the flow of information and commands between the different components in this project in the order in which they are executed.

The first flow is a happy flow, where everything goes as intended.
The second flow is a sad flow, where the menu could not be found in the BlobContainer.

```mermaid
sequenceDiagram

    UserBrowser->>WebserverContainer: Request menu.html

    WebserverContainer-->>UserBrowser: Send menu.html

    UserBrowser->>UserBrowser: Execute Javascript

    UserBrowser->>AzureFunction: Fetch menu

    AzureFunction->>BlobContainer: Get 'menu.json'

    BlobContainer-->> AzureFunction: Send 'menu.json'

    AzureFunction-->>UserBrowser: Send menu

    UserBrowser->>UserBrowser: Add items to order

    UserBrowser->>UserBrowser: Go to payment of order

    UserBrowser->>AzureFunction: Post order and toPay to TableOutput

    AzureFunction->>BlobContainer: Save order as '<GUID>.json'

    BlobContainer-->>AzureFunction: OK

    AzureFunction->>TableStore: Add order with reference to '<GUID>.json'

    TableStore-->> AzureFunction: OK

    AzureFunction-->>UserBrowser: OK

```

```mermaid
sequenceDiagram

    UserBrowser->>WebserverContainer: Request menu.html

    WebserverContainer-->>UserBrowser: Send menu.html

    UserBrowser->>UserBrowser: Execute Javascript

    UserBrowser->>AzureFunction: Fetch menu

    AzureFunction->>BlobContainer: Get 'menu.json'

    BlobContainer-->> AzureFunction: Send error: 'menu.json' could not be found

    AzureFunction-->>UserBrowser: Send empty menu

```