# 表单

表单（Form）是 HTML 中用于收集用户输入数据的元素，它提供了一种交互式的方式，使用户能够向服务器提交数据。表单通常由一组表单元素组成，例如文本框、下拉框、单选按钮、复选框等，用户可以在这些元素中输入或选择相应的数据。一旦用户提交表单，其中的数据将被发送到服务器进行处理或存储。

以下是 HTML 表单的基本结构和一些常用的表单元素：

1. **`<form>`：定义表单**
   - `<form>` 标签用于定义表单。
   - `action` 属性用于指定表单数据提交的目标 URL。
   - `method` 属性用于指定表单数据提交的 HTTP 方法，常用的值包括 "get" 和 "post"。
2. **表单元素**：
   - **文本框 `<input type="text">`**：用于接收单行文本输入。
   - **密码框 `<input type="password">`**：用于接收密码输入，输入内容会被隐藏。
   - **文本域 `<textarea>`**：用于接收多行文本输入。
   - **下拉框 `<select>` 和 `<option>`**：用于提供选择项，用户可以从列表中选择一个或多个选项。
   - **单选按钮 `<input type="radio">`**：用于提供互斥的选择，用户只能选择其中一个选项。
   - **复选框 `<input type="checkbox">`**：用于提供多项选择，用户可以选择多个选项。
   - **提交按钮 `<input type="submit">`**：用于提交表单数据。
   - **重置按钮 `<input type="reset">`**：用于重置表单中的所有表单元素的值为默认值。
3. **`<label>`：定义表单元素的标签**
   - `<label>` 标签用于为表单元素定义标签，提高表单的可访问性和用户体验。
4. **`<fieldset>` 和 `<legend>`：定义表单组**
   - `<fieldset>` 标签用于将相关的表单元素分组在一起。
   - `<legend>` 标签用于定义 `<fieldset>` 的标题。
5. **表单验证**：
   - HTML5 提供了一些内置的表单验证功能，如 `required`、`pattern`、`min`、`max` 等属性，可以在客户端对表单数据进行基本的验证。
   - 除了客户端验证外，还可以使用服务器端脚本对表单数据进行进一步验证和处理。

HTML 表单是网站和 Web 应用程序中收集用户输入数据的重要组成部分，开发者可以使用表单来构建各种交互式功能，如登录页面、注册页面、数据提交页面等。使用正确的表单元素和属性，以及合适的验证机制，可以提高表单的易用性和安全性。

以下是一个简单的 HTML 表单示例，包含文本框、密码框、单选按钮、复选框、下拉框、提交按钮和重置按钮：

```html
<form action="/submit-form" method="post">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username" required><br><br>
  
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required><br><br>
  
  <label>Gender:</label><br>
  <input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label>
  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label><br><br>
  
  <label for="newsletter">Subscribe to Newsletter:</label>
  <input type="checkbox" id="newsletter" name="newsletter"><br><br>
  
  <label for="country">Country:</label>
  <select id="country" name="country">
      <option value="usa">USA</option>
      <option value="canada">Canada</option>
      <option value="uk">UK</option>
  </select><br><br>
  
  <input type="submit" value="Submit">
  <input type="reset" value="Reset">
</form>
```

