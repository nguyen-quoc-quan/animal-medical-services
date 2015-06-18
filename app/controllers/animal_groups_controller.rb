class AnimalGroupsController < ApplicationController
  before_action :set_animal_group, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @animal_groups = AnimalGroup.all
    respond_with(@animal_groups)
  end

  def show
    respond_with(@animal_group)
  end

  def new
    @animal_group = AnimalGroup.new
    respond_with(@animal_group)
  end

  def edit
  end

  def create
    @animal_group = AnimalGroup.new(animal_group_params)
    @animal_group.save
    respond_with(@animal_group)
  end

  def update
    @animal_group.update(animal_group_params)
    respond_with(@animal_group)
  end

  def destroy
    @animal_group.destroy
    respond_with(@animal_group)
  end

  private
    def set_animal_group
      @animal_group = AnimalGroup.find(params[:id])
    end

    def animal_group_params
      params.require(:animal_group).permit(:quantity, :started_at, :customer_id)
    end
end
