#!/usr/bin/python3
"""
Update data from a user
"""

import time  # Import the time module
from sqlalchemy import create_engine, func
from sqlalchemy.orm import sessionmaker
from models import User, Service, Town, UserServiceAssoc, BaseModel # Add Town import

if __name__ == "__main__":

    classes_dict = {'User': User, 'Service': Service}
    # Create the engine
    engine = create_engine('postgresql://postgres:9150@localhost/postgres', echo=True)

    # Create a session
    Session = sessionmaker(bind=engine)
    session = Session()

    data = {'Service': {'name': 'Auto Body Painting', 'town': 'All'}}
    town_name = "All"
    data_dict = data['Service']

    if 'town' in data_dict:
        town_name = data_dict['town']
    if 'name' in data_dict:
        service_name = data_dict['name']
    else:
        print('no service name provided') 
    print(town_name)
    service = session.query(Service).filter_by(name = service_name).first()
    my_service_id = service.id

    if town_name == 'All':
        print("Doing all")
        rows = session.query(UserServiceAssoc.user_id, func.array_agg(Town.name)) \
        .join(Town) \
        .filter(UserServiceAssoc.service_id == my_service_id) \
        .group_by(UserServiceAssoc.user_id) \
        .order_by(UserServiceAssoc.user_id) \
        .all()
    else:
        print("Doing Specific town")
        rows = session.query(UserServiceAssoc.user_id, func.array_agg(Town.name)) \
        .join(Town) \
        .filter((UserServiceAssoc.service_id == my_service_id) & (Town.name == town_name)) \
        .group_by(UserServiceAssoc.user_id) \
        .order_by(UserServiceAssoc.user_id) \
        .all()

    print(rows)


    session.close

