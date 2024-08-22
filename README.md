NIC Validation Application

The NIC Validation Application is a mobile-responsive web application developed using React.js, Node.js, Express, and MySQL, with a microservices architecture. The app allows users to log in, upload four CSV files with NIC numbers, and validate them to retrieve details like birthdate, age, and gender. The dashboard provides a summary, including total records, male/female counts, and data visualization using pie and bar charts. Users can also generate reports, filter data, and download files in various formats. The application focuses on efficiency, user-friendliness, and proper UI design.
Here are the key points and special features of the NIC Validation Application:

1. Technology Stack: 
   - **Front End**: Built with React.js, ensuring a dynamic and responsive user interface.
   - **Back End**: Developed using Node.js and Express, leveraging a microservices architecture for scalability and modularity.
   - **Database**: MySQL is used for efficient data storage and retrieval.

2. CSV File Upload and NIC Validation:
   - Users can upload four CSV files simultaneously, which is a mandatory requirement.
   - The system validates NIC numbers from these files in bulk, extracting essential details such as birthdate, age, and gender.

3. **Dashboard Overview**:
   - Summary View: The dashboard provides a summary of the total number of records, with a breakdown by male and female users.
   - Data Visualization: Includes pie charts and bar charts for analyzing user demographics and other metrics.

4. User Management:
   - Login/Logout: Secure login and logout functionalities are provided, with support for password recovery.
   - Session Management: Ensures that only authenticated users can access the system's features.

5. Information Management:
   - Data Storage: All validated NIC data is stored in the database, including the association of records with their respective CSV file names.
   - Data Retrieval: Users can view validated NIC data directly within the application, enhancing accessibility and transparency.

6. Reporting:
   - Filtering and Exporting: Users can filter data and generate reports in multiple formats, including PDF and CSV, for easy download and sharing.

7. Non-Functional Requirements:
   - Efficiency: Optimized for handling large CSV uploads and quick validation processes.
   - User-Friendliness: Designed with a focus on intuitive navigation and ease of use.
   - Theming and UI: Implements proper theming and UI element arrangement for a clean and organized interface.

These points highlight the robust functionality, user-centered design, and technical architecture of the NIC Validation Application.
