# Sauce Demo Web Application Test Plan

## Application Overview

Functional and exploratory test plan for Sauce Demo (Swag Labs) at https://www.saucedemo.com/. Each test starts from a fresh browser context and uses the standard_user account unless the scenario specifies another supplied account. The application exposes login, inventory browsing and sorting, product details, cart management, checkout, order confirmation, navigation drawer, logout, reset state, external About/social links, and PDF order generation.

## Test Scenarios

### 1. Authentication

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard user

**File:** `tests/authentication/successful-login.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed with Username, Password, and Login controls.
  2. Enter username `standard_user` and password `secret_sauce`, then select Login.
    - expect: The user is redirected to `/inventory.html`.
    - expect: The Products heading and six product listings are visible.
    - expect: The cart is initially empty.

#### 1.2. Required-field and invalid-credential errors

**File:** `tests/authentication/login-validation.spec.ts`

**Steps:**
  1. Start from a fresh login page and select Login without entering either field.
    - expect: The user remains on the login page.
    - expect: A required username error is displayed.
  2. Enter a valid username with an incorrect password and select Login.
    - expect: The user remains on the login page.
    - expect: An authentication error is displayed and inventory is not opened.
  3. Enter `locked_out_user` with `secret_sauce` and select Login.
    - expect: The user remains on the login page.
    - expect: The message `Epic sadface: Sorry, this user has been locked out.` is displayed.

#### 1.3. Logout and protected-page access

**File:** `tests/authentication/logout-and-protected-access.spec.ts`

**Steps:**
  1. Log in as `standard_user`, open the navigation menu, and select Logout.
    - expect: The user returns to the login page.
    - expect: The authenticated inventory session is ended.
  2. Navigate directly to `/inventory.html` after logout.
    - expect: The application redirects to the login page or otherwise prevents access to inventory.

### 2. Inventory And Products

**Seed:** `tests/seed.spec.ts`

#### 2.1. Inventory rendering and product details

**File:** `tests/inventory/inventory-and-details.spec.ts`

**Steps:**
  1. Log in as `standard_user`.
    - expect: Six products are displayed with names, descriptions, prices, images, and Add to cart controls.
  2. Select the Sauce Labs Backpack name or image.
    - expect: The product detail URL is opened.
    - expect: The detail page shows the matching name, description, price, Add to cart control, and Back to products control.
  3. Select Back to products.
    - expect: The user returns to the inventory page.

#### 2.2. Product sorting options

**File:** `tests/inventory/product-sorting.spec.ts`

**Steps:**
  1. Log in as `standard_user` and record the initial product order.
    - expect: Products are initially sorted Name (A to Z).
  2. Select Name (Z to A), Price (low to high), and Price (high to low) one at a time.
    - expect: The displayed order changes after each selection.
    - expect: Name sorting is lexicographic and price sorting is numerically ascending or descending.
    - expect: The selected option remains visible in the sort control.

#### 2.3. Inventory cart add and remove state

**File:** `tests/inventory/add-remove-products.spec.ts`

**Steps:**
  1. Log in as `standard_user` and add the Backpack and Bike Light.
    - expect: Each Add to cart control changes to Remove.
    - expect: The cart badge shows 2.
  2. Open the cart, remove the Backpack, then continue shopping.
    - expect: The Backpack is absent from the cart.
    - expect: The cart badge decreases to 1.
    - expect: The inventory page is restored and the Bike Light remains selected.
  3. Open the navigation menu and select Reset App State.
    - expect: Cart contents are cleared and the cart badge is removed or shows zero.
    - expect: Product controls return to Add to cart.

### 3. Cart And Checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Cart contents and empty-cart behavior

**File:** `tests/cart/cart-contents.spec.ts`

**Steps:**
  1. Log in, add one product, and open the cart.
    - expect: Your Cart is displayed with quantity, product description, price, Remove, Continue Shopping, and Checkout controls.
    - expect: The displayed quantity, name, and price match the selected product.
  2. Remove the only product.
    - expect: The cart becomes empty.
    - expect: Checkout remains available or is handled consistently without creating an order; no stale item remains.

#### 3.2. Checkout required-field validation

**File:** `tests/checkout/required-fields.spec.ts`

**Steps:**
  1. Log in, add a product, open the cart, and select Checkout.
    - expect: Checkout: Your Information is displayed with First Name, Last Name, Zip/Postal Code, Cancel, and Continue controls.
  2. Select Continue with all fields empty.
    - expect: The user remains on checkout step one.
    - expect: The error `Error: First Name is required` is displayed.
  3. Enter only a first name and select Continue.
    - expect: The user remains on step one.
    - expect: A last-name-required error is displayed.
  4. Enter first and last names but leave postal code empty and select Continue.
    - expect: The user remains on step one.
    - expect: A postal-code-required error is displayed.

#### 3.3. Checkout overview totals and completion

**File:** `tests/checkout/complete-purchase.spec.ts`

**Steps:**
  1. Add the Backpack, enter First Name `Ada`, Last Name `Lovelace`, and Zip/Postal Code `12345`, then continue.
    - expect: Checkout: Overview is displayed.
    - expect: The selected item, payment information, shipping information, item total, tax, and total are visible.
    - expect: For the Backpack, item total is $29.99, tax is $2.40, and total is $32.39.
  2. Select Finish.
    - expect: Checkout: Complete! is displayed.
    - expect: The message `Thank you for your order!` and dispatch confirmation are visible.
    - expect: Back Home and Generate PDF order controls are available.
  3. Select Back Home.
    - expect: The user returns to inventory.
    - expect: The completed order does not leave stale checkout controls or stale cart state.

#### 3.4. Checkout cancellation and navigation

**File:** `tests/checkout/cancel-navigation.spec.ts`

**Steps:**
  1. Add a product and enter checkout step one, then select Cancel.
    - expect: The user returns to the cart or the documented previous shopping page.
    - expect: No order is submitted.
  2. From the cart select Continue Shopping.
    - expect: The user returns to inventory and retains the cart contents.
  3. From checkout overview select Cancel.
    - expect: The user leaves checkout without completing the order.
    - expect: The cart and selected products remain consistent.

### 4. Navigation And Resilience

**Seed:** `tests/seed.spec.ts`

#### 4.1. Navigation drawer links and About destination

**File:** `tests/navigation/navigation-drawer.spec.ts`

**Steps:**
  1. Log in and open the navigation drawer.
    - expect: All Items, About, Logout, Reset App State, and Close Menu controls are visible.
  2. Select Close Menu, reopen the drawer, and select All Items.
    - expect: The drawer closes and reopens correctly.
    - expect: All Items returns to inventory.
  3. Open the drawer and select About.
    - expect: The Sauce Labs About destination opens at the expected external site or is handled in the expected tab.

#### 4.2. PDF order generation

**File:** `tests/navigation/pdf-order.spec.ts`

**Steps:**
  1. Complete a purchase and select Generate PDF order on the confirmation page.
    - expect: A PDF download or browser PDF response is produced.
    - expect: The generated artifact is non-empty and corresponds to the completed order.

#### 4.3. Refresh and session consistency

**File:** `tests/navigation/session-consistency.spec.ts`

**Steps:**
  1. Log in, add at least one product, and refresh inventory and cart pages.
    - expect: The authenticated session remains usable after refresh.
    - expect: Cart contents and badge remain consistent after refresh.
  2. Refresh the checkout overview before finishing.
    - expect: The overview remains usable or the application returns to a coherent authenticated state without duplicate order submission.
